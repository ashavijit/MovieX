/**
 * @fileoverview gRPC-Web generated client stub for loginPackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.loginPackage = require('./login_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.loginPackage.LoginServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.loginPackage.LoginServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.loginPackage.LoginRequest,
 *   !proto.loginPackage.LoginResponse>}
 */
const methodDescriptor_LoginService_Login = new grpc.web.MethodDescriptor(
  '/loginPackage.LoginService/Login',
  grpc.web.MethodType.UNARY,
  proto.loginPackage.LoginRequest,
  proto.loginPackage.LoginResponse,
  /**
   * @param {!proto.loginPackage.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.loginPackage.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.loginPackage.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.loginPackage.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.loginPackage.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.loginPackage.LoginServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/loginPackage.LoginService/Login',
      request,
      metadata || {},
      methodDescriptor_LoginService_Login,
      callback);
};


/**
 * @param {!proto.loginPackage.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.loginPackage.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.loginPackage.LoginServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/loginPackage.LoginService/Login',
      request,
      metadata || {},
      methodDescriptor_LoginService_Login);
};


module.exports = proto.loginPackage;

