/**
 * @fileoverview gRPC-Web generated client stub for updateUserPackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.updateUserPackage = require('./updateUser_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.updateUserPackage.updateUserServiceClient =
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
proto.updateUserPackage.updateUserServicePromiseClient =
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
 *   !proto.updateUserPackage.UpdateUserReservationRequest,
 *   !proto.updateUserPackage.UpdateUserReservationResponse>}
 */
const methodDescriptor_updateUserService_UpdateUserReservation = new grpc.web.MethodDescriptor(
  '/updateUserPackage.updateUserService/UpdateUserReservation',
  grpc.web.MethodType.UNARY,
  proto.updateUserPackage.UpdateUserReservationRequest,
  proto.updateUserPackage.UpdateUserReservationResponse,
  /**
   * @param {!proto.updateUserPackage.UpdateUserReservationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.updateUserPackage.UpdateUserReservationResponse.deserializeBinary
);


/**
 * @param {!proto.updateUserPackage.UpdateUserReservationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.updateUserPackage.UpdateUserReservationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.updateUserPackage.UpdateUserReservationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.updateUserPackage.updateUserServiceClient.prototype.updateUserReservation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/updateUserPackage.updateUserService/UpdateUserReservation',
      request,
      metadata || {},
      methodDescriptor_updateUserService_UpdateUserReservation,
      callback);
};


/**
 * @param {!proto.updateUserPackage.UpdateUserReservationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.updateUserPackage.UpdateUserReservationResponse>}
 *     Promise that resolves to the response
 */
proto.updateUserPackage.updateUserServicePromiseClient.prototype.updateUserReservation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/updateUserPackage.updateUserService/UpdateUserReservation',
      request,
      metadata || {},
      methodDescriptor_updateUserService_UpdateUserReservation);
};


module.exports = proto.updateUserPackage;

