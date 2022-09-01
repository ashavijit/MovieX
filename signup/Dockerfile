FROM python:3.9
WORKDIR /etc/movie

#INSTALL Python 3
RUN pip install passlib
RUN pip install Pillow
RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get -y install python3.9-dev
RUN pip3 install pymongo
RUN pip3 install grpcio
RUN pip3 install google-cloud
RUN pip3 install google-cloud-vision
RUN pip3 install py-bcrypt
COPY . .

WORKDIR /etc/movie

CMD ["python", "./server.py"]