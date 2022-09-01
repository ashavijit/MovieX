import grpc
import time
import threading
import sys
from login_pb2 import LoginForm

from login_pb2_grpc import LoginServiceStub

channel = grpc.insecure_channel("localhost:9090")
client = LoginServiceStub(channel)
from login_pb2 import (
    LoginRequest,
    LoginResponse,
)
num_requests = int(input('number of threads: '))
print("Number of threads:", num_requests)
times = [0]*num_requests
threads = []

def get_response(thread_idx):
    request = LoginRequest(form=LoginForm(email="1", password="1"))
    individual_start = time.time()
    response = client.Login(request)
    individual_end = time.time()
    times[thread_idx] = individual_end - individual_start

# try:
start = time.time()
for i in range(num_requests):
    temp = threading.Thread(target=get_response, args=(i,))
    threads.append(temp)
    #temp.start()
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