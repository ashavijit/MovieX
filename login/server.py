from concurrent import futures
from sre_constants import SUCCESS
import grpc
# import form_pb2 as form_pb2
# import form_pb2_grpc as form_pb2_grpc
import login_pb2 as login_pb2
import login_pb2_grpc as login_pb2_grpc
from passlib.hash import pbkdf2_sha256
import uuid
import json

import logging

import pymongo

db = pymongo.MongoClient("login_db", 27017).membership_system
# db = pymongo.MongoClient("localhost", 27017).membership_system


class Listener(login_pb2_grpc.LoginServiceServicer):
  def __init__(self) -> None:
      super().__init__()
  def Login(self, request, context):
    email, password = request.form.email, request.form.password
    userinfo = db.users.find_one({"email":email})
    if userinfo is None:
      return login_pb2.LoginResponse(success=False, message="Invalid email address")
    elif not pbkdf2_sha256.verify(password, userinfo["password"]):
      return login_pb2.LoginResponse(success=False, message="Wrong password!")
    # reservation
    res = []
    reservedTicketObj = json.loads(userinfo["reservedTicket"])
    for aTicket in reservedTicketObj:
      print(aTicket["Title"])
      res.append(login_pb2.Reservation(movie=aTicket["Title"], theatre=aTicket["Theatre"], time=aTicket["Time"]))
    return login_pb2.LoginResponse(success = True, message="Server successfully received request from client", name=userinfo["name"], email=userinfo["email"], reservations=res)

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  login_pb2_grpc.add_LoginServiceServicer_to_server(
      Listener(), server)
  server.add_insecure_port('0.0.0.0:9090')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  logging.basicConfig()
  serve()