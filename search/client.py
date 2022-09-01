from enum import auto
from tkinter.messagebox import NO
import grpc
import time
import threading
import sys
from search_pb2_grpc import SearchServiceStub

channel = grpc.insecure_channel("localhost:9093")
client = SearchServiceStub(channel)
from search_pb2 import (
    SearchMovieRequest,
)
num_requests = int(input('number of threads: '))
print("Number of threads:", num_requests)
times = [0]*num_requests
threads = []

def get_response(thread_idx):
    request = SearchMovieRequest(movieName="")
    individual_start = time.time()
    response=client.Search(request)
    #print(response)
    individual_end = time.time()
    times[thread_idx] = individual_end - individual_start

# try:
start = time.time()
for i in range(num_requests):
    temp = threading.Thread(target=get_response, args=(i,))
    threads.append(temp)
# except:
#     print('Error')
for th in threads:
    th.start()
for t in threads:
    t.join()
end = time.time()
elapse = end - start
print('start: ', start)
print('end: ', end)
print('elapse: ', elapse)
print(times)