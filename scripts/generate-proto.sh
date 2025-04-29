#!/bin/bash

# Create generated directory if it doesn't exist
mkdir -p src/proto/generated

# Generate TypeScript files from proto files
protoc \
  --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=./src/proto/generated \
  --ts_proto_opt=nestJs=true,fileSuffix=.pb,addGrpcMetadata=true \
  --ts_proto_opt=esModuleInterop=true,outputClientImpl=none \
  ./src/proto/*.proto

# Move generated files to the correct location
mv src/proto/generated/src/proto/* src/proto/generated/
rm -rf src/proto/generated/src 