/**
 * @fileoverview gRPC-Web generated client stub for signupPackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.signupPackage = require('./signup_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.signupPackage.SignupServiceClient =
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
proto.signupPackage.SignupServicePromiseClient =
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
 *   !proto.signupPackage.SignupRequest,
 *   !proto.signupPackage.SignupResponse>}
 */
const methodDescriptor_SignupService_Signup = new grpc.web.MethodDescriptor(
  '/signupPackage.SignupService/Signup',
  grpc.web.MethodType.UNARY,
  proto.signupPackage.SignupRequest,
  proto.signupPackage.SignupResponse,
  /**
   * @param {!proto.signupPackage.SignupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.signupPackage.SignupResponse.deserializeBinary
);


/**
 * @param {!proto.signupPackage.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.signupPackage.SignupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.signupPackage.SignupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.signupPackage.SignupServiceClient.prototype.signup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/signupPackage.SignupService/Signup',
      request,
      metadata || {},
      methodDescriptor_SignupService_Signup,
      callback);
};


/**
 * @param {!proto.signupPackage.SignupRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.signupPackage.SignupResponse>}
 *     Promise that resolves to the response
 */
proto.signupPackage.SignupServicePromiseClient.prototype.signup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/signupPackage.SignupService/Signup',
      request,
      metadata || {},
      methodDescriptor_SignupService_Signup);
};


module.exports = proto.signupPackage;

