/**
 * @fileoverview gRPC-Web generated client stub for moviePackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.moviePackage = require('./movie_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.moviePackage.MovieServiceClient =
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
proto.moviePackage.MovieServicePromiseClient =
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
 *   !proto.moviePackage.Empty,
 *   !proto.moviePackage.MovieCardResponse>}
 */
const methodDescriptor_MovieService_GetAll = new grpc.web.MethodDescriptor(
  '/moviePackage.MovieService/GetAll',
  grpc.web.MethodType.UNARY,
  proto.moviePackage.Empty,
  proto.moviePackage.MovieCardResponse,
  /**
   * @param {!proto.moviePackage.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.moviePackage.MovieCardResponse.deserializeBinary
);


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.moviePackage.MovieCardResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.moviePackage.MovieCardResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.moviePackage.MovieServiceClient.prototype.getAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/moviePackage.MovieService/GetAll',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetAll,
      callback);
};


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.moviePackage.MovieCardResponse>}
 *     Promise that resolves to the response
 */
proto.moviePackage.MovieServicePromiseClient.prototype.getAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/moviePackage.MovieService/GetAll',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.moviePackage.Empty,
 *   !proto.moviePackage.MovieCardResponse>}
 */
const methodDescriptor_MovieService_GetPlaying = new grpc.web.MethodDescriptor(
  '/moviePackage.MovieService/GetPlaying',
  grpc.web.MethodType.UNARY,
  proto.moviePackage.Empty,
  proto.moviePackage.MovieCardResponse,
  /**
   * @param {!proto.moviePackage.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.moviePackage.MovieCardResponse.deserializeBinary
);


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.moviePackage.MovieCardResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.moviePackage.MovieCardResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.moviePackage.MovieServiceClient.prototype.getPlaying =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/moviePackage.MovieService/GetPlaying',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetPlaying,
      callback);
};


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.moviePackage.MovieCardResponse>}
 *     Promise that resolves to the response
 */
proto.moviePackage.MovieServicePromiseClient.prototype.getPlaying =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/moviePackage.MovieService/GetPlaying',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetPlaying);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.moviePackage.Empty,
 *   !proto.moviePackage.MovieCardResponse>}
 */
const methodDescriptor_MovieService_GetComing = new grpc.web.MethodDescriptor(
  '/moviePackage.MovieService/GetComing',
  grpc.web.MethodType.UNARY,
  proto.moviePackage.Empty,
  proto.moviePackage.MovieCardResponse,
  /**
   * @param {!proto.moviePackage.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.moviePackage.MovieCardResponse.deserializeBinary
);


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.moviePackage.MovieCardResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.moviePackage.MovieCardResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.moviePackage.MovieServiceClient.prototype.getComing =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/moviePackage.MovieService/GetComing',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetComing,
      callback);
};


/**
 * @param {!proto.moviePackage.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.moviePackage.MovieCardResponse>}
 *     Promise that resolves to the response
 */
proto.moviePackage.MovieServicePromiseClient.prototype.getComing =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/moviePackage.MovieService/GetComing',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetComing);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.moviePackage.MovieRequest,
 *   !proto.moviePackage.MovieBgResponse>}
 */
const methodDescriptor_MovieService_GetAMovie = new grpc.web.MethodDescriptor(
  '/moviePackage.MovieService/GetAMovie',
  grpc.web.MethodType.UNARY,
  proto.moviePackage.MovieRequest,
  proto.moviePackage.MovieBgResponse,
  /**
   * @param {!proto.moviePackage.MovieRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.moviePackage.MovieBgResponse.deserializeBinary
);


/**
 * @param {!proto.moviePackage.MovieRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.moviePackage.MovieBgResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.moviePackage.MovieBgResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.moviePackage.MovieServiceClient.prototype.getAMovie =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/moviePackage.MovieService/GetAMovie',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetAMovie,
      callback);
};


/**
 * @param {!proto.moviePackage.MovieRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.moviePackage.MovieBgResponse>}
 *     Promise that resolves to the response
 */
proto.moviePackage.MovieServicePromiseClient.prototype.getAMovie =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/moviePackage.MovieService/GetAMovie',
      request,
      metadata || {},
      methodDescriptor_MovieService_GetAMovie);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.moviePackage.UpdateMovieInfoRequest,
 *   !proto.moviePackage.UpdateMovieInfoResponse>}
 */
const methodDescriptor_MovieService_UpdateReservedMovieInfo = new grpc.web.MethodDescriptor(
  '/moviePackage.MovieService/UpdateReservedMovieInfo',
  grpc.web.MethodType.UNARY,
  proto.moviePackage.UpdateMovieInfoRequest,
  proto.moviePackage.UpdateMovieInfoResponse,
  /**
   * @param {!proto.moviePackage.UpdateMovieInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.moviePackage.UpdateMovieInfoResponse.deserializeBinary
);


/**
 * @param {!proto.moviePackage.UpdateMovieInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.moviePackage.UpdateMovieInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.moviePackage.UpdateMovieInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.moviePackage.MovieServiceClient.prototype.updateReservedMovieInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/moviePackage.MovieService/UpdateReservedMovieInfo',
      request,
      metadata || {},
      methodDescriptor_MovieService_UpdateReservedMovieInfo,
      callback);
};


/**
 * @param {!proto.moviePackage.UpdateMovieInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.moviePackage.UpdateMovieInfoResponse>}
 *     Promise that resolves to the response
 */
proto.moviePackage.MovieServicePromiseClient.prototype.updateReservedMovieInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/moviePackage.MovieService/UpdateReservedMovieInfo',
      request,
      metadata || {},
      methodDescriptor_MovieService_UpdateReservedMovieInfo);
};


module.exports = proto.moviePackage;

