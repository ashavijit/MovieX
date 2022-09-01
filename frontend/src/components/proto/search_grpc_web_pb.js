/**
 * @fileoverview gRPC-Web generated client stub for searchPackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.searchPackage = require('./search_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.searchPackage.SearchServiceClient =
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
proto.searchPackage.SearchServicePromiseClient =
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
 *   !proto.searchPackage.SearchMovieRequest,
 *   !proto.searchPackage.SearchMovieResponse>}
 */
const methodDescriptor_SearchService_Search = new grpc.web.MethodDescriptor(
  '/searchPackage.SearchService/Search',
  grpc.web.MethodType.UNARY,
  proto.searchPackage.SearchMovieRequest,
  proto.searchPackage.SearchMovieResponse,
  /**
   * @param {!proto.searchPackage.SearchMovieRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.searchPackage.SearchMovieResponse.deserializeBinary
);


/**
 * @param {!proto.searchPackage.SearchMovieRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.searchPackage.SearchMovieResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.searchPackage.SearchMovieResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.searchPackage.SearchServiceClient.prototype.search =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/searchPackage.SearchService/Search',
      request,
      metadata || {},
      methodDescriptor_SearchService_Search,
      callback);
};


/**
 * @param {!proto.searchPackage.SearchMovieRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.searchPackage.SearchMovieResponse>}
 *     Promise that resolves to the response
 */
proto.searchPackage.SearchServicePromiseClient.prototype.search =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/searchPackage.SearchService/Search',
      request,
      metadata || {},
      methodDescriptor_SearchService_Search);
};


module.exports = proto.searchPackage;

