from concurrent import futures
import email
from sre_constants import SUCCESS
import grpc
import updateUser_pb2 as updateUser_pb2
import updateUser_pb2_grpc as updateUser_pb2_grpc
from passlib.hash import pbkdf2_sha256

import logging

import pymongo

# db = pymongo.MongoClient("localhost", 27017).membership_system
db = pymongo.MongoClient("login_db", 27017).membership_system
allUsers = db["users"]

class Listener(updateUser_pb2_grpc.updateUserServiceServicer):
  def __init__(self) -> None:
      super().__init__()

  def UpdateUserReservation(self, request, context):
    allUsers.find_one_and_update(
      {"email": request.userEmail},
      {"$set":
        {"reservedTicket": request.newReservationList}
      }, upsert=True
    )
    userinfo = db.users.find_one({"email": request.userEmail})
    return updateUser_pb2.UpdateUserReservationResponse(status=True, currReservationList=userinfo["reservedTicket"])

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  updateUser_pb2_grpc.add_updateUserServiceServicer_to_server(
      Listener(), server)
  server.add_insecure_port('0.0.0.0:9094')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  logging.basicConfig()
  serve()