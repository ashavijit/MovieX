from concurrent import futures
import grpc
import movie_pb2 as movie_pb2
import movie_pb2_grpc as movie_pb2_grpc
import json
import logging
from bson.binary import Binary
import pymongo
from PIL import Image
import io

# db = pymongo.MongoClient("localhost", 27017).movie_reservation
db = pymongo.MongoClient("movie_db", 27017).movie_reservation
allMovies = db["allMovies"]

class Listener(movie_pb2_grpc.MovieServiceServicer):
  def __init__(self) -> None:
      super().__init__()
  
  def UpdateReservedMovieInfo(self, request, context):
    allMovies.find_one_and_update(
      {"title": request.movieName},
      {"$set":
        {"theatre": request.newScreeningInfo}
      }, upsert=True
    )
    return movie_pb2.UpdateMovieInfoResponse(status=True)
    
  def GetAll(self, request, context):
    movies = allMovies.find()
    res = []
    for movie in movies:
      res.append(movie_pb2.MovieCard(
        title=movie["title"],
        cardImg=movie_pb2.B64Image(b64image=(movie["cardImg"]), height=225, width=400),
      ))
    return movie_pb2.MovieCardResponse(movies=res)
  
  def GetComing(self, request, context):
    movies = allMovies.find({"type":"coming"})
    res = []
    for movie in movies:
      res.append(movie_pb2.MovieCard(
        title=movie["title"],
        cardImg=movie_pb2.B64Image(b64image=(movie["cardImg"]), height=225, width=400),
        ))
    return movie_pb2.MovieCardResponse(movies=res)

  def GetPlaying (self, request, context):
    movies = allMovies.find({"type":"playing"})
    res = []
    for movie in movies:
      res.append(movie_pb2.MovieCard(
        title=movie["title"],
        cardImg=movie_pb2.B64Image(b64image=(movie["cardImg"]), height=225, width=400),
        ))
    return movie_pb2.MovieCardResponse(movies=res)
  
  def GetAMovie(self, request, context):
    res = []
    movie = allMovies.find_one({"title":request.movieName})
    res.append(movie_pb2.MovieBg(
        title=movie["title"],
        description = movie["description"],
        subTitle=movie["subTitle"],
        titleImg=movie_pb2.B64Image(b64image=(movie["titleImg"]), height=810, width=1440),
        backgroundImg=movie_pb2.B64Image(b64image=(movie["backgroundImg"]), height=810, width=1440),
        theatre = movie["theatre"],
        movieType = movie["type"]
      ))
    return movie_pb2.MovieBgResponse(movies=res)

def initialize():
  movie_file_name = "./MovieData/src/disneyPlusMoviesData.json"
  movie_file = open(movie_file_name, encoding='utf-8')
  movies_Json = json.load(movie_file)
  if len(list(allMovies.find({}))) == len(movies_Json["movies"]): return
  for key, value in movies_Json['movies'].items():
    movie = {"title": value["title"], "description":value["description"], "subTitle":value["subTitle"], "type":value["type"]}
    movie["cardImg"] = Binary(open(value["cardImg"], 'rb').read())
    movie["backgroundImg"] = Binary(open(value["backgroundImg"], 'rb').read())
    movie["titleImg"] = Binary(open(value["titleImg"], 'rb').read())
    movie["theatre"] = json.dumps(value["theatre"])

    old_data = allMovies.find_one({"title":value["title"]})
    if old_data:
      for key, value in old_data.items():
        if key == '_id':
          continue
        if value != movie[key]:
          allMovies.update_one({key:key}, {"$set":{key:value}})
    else: 
      allMovies.insert_one(movie)

def checkAll():
  i = 0
  for movie in allMovies.find():
    if i > 0: break
    pic=Image.open(io.BytesIO(movie['backgroundImg']))
    pic.show()
    i += 1

def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  movie_pb2_grpc.add_MovieServiceServicer_to_server(
      Listener(), server)
  server.add_insecure_port('0.0.0.0:9091')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  initialize()
  logging.basicConfig()
  serve()