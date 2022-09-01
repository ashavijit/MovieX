from concurrent import futures
from sre_constants import SUCCESS
import grpc
# import form_pb2 as form_pb2
# import form_pb2_grpc as form_pb2_grpc
import signup_pb2 as signup_pb2
import signup_pb2_grpc as signup_pb2_grpc
from passlib.hash import pbkdf2_sha256
import uuid

import logging

import pymongo

# db = pymongo.MongoClient("localhost", 27017).membership_system

db = pymongo.MongoClient("login_db", 27017).membership_system

class Listener(signup_pb2_grpc.SignupServiceServicer):
  def __init__(self) -> None:
      super().__init__()
  def Signup(self, request, context):
    name, email, password1, password2 = request.form.name, request.form.email, request.form.password1, request.form.password2
    
    if(password1 != password2): return signup_pb2.SignupResponse(success = False,message="Passwords do not match")
    user = {
      "_id": uuid.uuid4().hex,
      "name": name,
      "email":email,
      "password":pbkdf2_sha256.hash(password1),
      "reservedTicket": "[]"
    }
    if db.users.find_one({"email":email}): return signup_pb2.SignupResponse(success = False,message="Email address already in use")
    if db.users.insert_one(user): return signup_pb2.SignupResponse(success=True,message="SignupResponse from server!")
    return signup_pb2.SignupResponse(success = False,message="Unknown error happend, please try again later.")

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  signup_pb2_grpc.add_SignupServiceServicer_to_server(
      Listener(), server)
  server.add_insecure_port('0.0.0.0:9092')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  logging.basicConfig()
  serve()