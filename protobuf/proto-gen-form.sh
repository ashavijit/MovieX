#!/bin/bash
# yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=. ./form.proto

protoc -I=. form.proto \
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

python3 -m grpc_tools.protoc -I./ --python_out=. --grpc_python_out=. form.proto