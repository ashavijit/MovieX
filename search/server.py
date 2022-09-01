from concurrent import futures
import grpc
import search_pb2 as search_pb2
import search_pb2_grpc as search_pb2_grpc
import json
import logging
from bson.binary import Binary
import pymongo
from PIL import Image
import io

# db = pymongo.MongoClient("localhost", 27017).movie_reservation

db = pymongo.MongoClient("movie_db", 27017).movie_reservation
allMovies = db["allMovies"]

class Listener(search_pb2_grpc.SearchServiceServicer):
  def __init__(self) -> None:
      super().__init__()
  def Search(self, request, context):
    targets = allMovies.find({"title":{'$regex':f".*{request.movieName}.*", '$options':'isx'}})
    if targets is None: 
      return search_pb2.SearchMovieResponse(exist = False, movie=None)
    res = []
    for movie in targets:
      res.append(search_pb2.Movie(
        title=movie["title"],
        cardImg=search_pb2.B64Image(b64image=(movie["cardImg"]), height=225, width=400)
      ))
    if len(res) == 0:
      print("Nothing")
    return search_pb2.SearchMovieResponse(exist = True, movie=res)
  
def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  search_pb2_grpc.add_SearchServiceServicer_to_server(
      Listener(), server)
  server.add_insecure_port('0.0.0.0:9093')
  server.start()
  server.wait_for_termination()
  
if __name__ == '__main__':
  logging.basicConfig()
  serve()