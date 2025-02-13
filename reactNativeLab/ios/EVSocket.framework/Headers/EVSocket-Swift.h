// Generated by Apple Swift version 3.1 (swiftlang-802.0.53 clang-802.0.42)
#pragma clang diagnostic push

#if defined(__has_include) && __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <objc/NSObject.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if defined(__has_include) && __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus) || __cplusplus < 201103L
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if defined(__has_attribute) && __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if defined(__has_attribute) && __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if defined(__has_attribute) && __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if defined(__has_attribute) && __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if defined(__has_attribute) && __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if defined(__has_attribute) && __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if defined(__has_attribute) && __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name) enum _name : _type _name; enum SWIFT_ENUM_EXTRA _name : _type
# if defined(__has_feature) && __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME) SWIFT_ENUM(_type, _name)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if defined(__has_feature) && __has_feature(modules)
@import ObjectiveC;
@import Foundation;
@import Dispatch;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"

SWIFT_CLASS("_TtC8EVSocket10Centrifuge")
@interface Centrifuge : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

@protocol ELPublicCentrifugeClientDelegate;
@protocol ELPublicCentrifugeChannelDelegate;
@protocol ELPublicResponseMessageDelegate;
@class NSError;

SWIFT_CLASS("_TtC8EVSocket17CentrifugeManager")
@interface CentrifugeManager : NSObject
@property (nonatomic, copy) NSString * _Nonnull channel;
@property (nonatomic, strong) id <ELPublicCentrifugeClientDelegate> _Null_unspecified clientDelegate;
@property (nonatomic, strong) id <ELPublicCentrifugeChannelDelegate> _Null_unspecified channelDelegate;
@property (nonatomic, strong) id <ELPublicResponseMessageDelegate> _Null_unspecified errorDelegate;
- (nonnull instancetype)initWithUrl:(NSString * _Nonnull)url channel:(NSString * _Nonnull)channel user:(NSString * _Nonnull)user token:(NSString * _Nonnull)token timeStamp:(NSString * _Nonnull)timeStamp;
- (void)sendMessageWithMessage:(NSString * _Nonnull)message;
- (void)connnect;
- (void)disconnect;
- (void)joinChannel;
- (void)leaveChannel;
- (void)clientWithDidReceiveError:(NSError * _Nonnull)error;
- (void)clientWithDidReceiveRefresh:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidDisconnect:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidSendMessage:(NSString * _Nullable)uid error:(NSError * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveMessageInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveJoinInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveLeaveInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveUnsubscribeInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end


SWIFT_PROTOCOL("_TtP8EVSocket33ELPublicCentrifugeChannelDelegate_")
@protocol ELPublicCentrifugeChannelDelegate
- (void)clientWithDidReceiveMessageInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveJoinInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveLeaveInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidReceiveUnsubscribeInChannel:(NSString * _Nonnull)channel uid:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
@end


SWIFT_PROTOCOL("_TtP8EVSocket32ELPublicCentrifugeClientDelegate_")
@protocol ELPublicCentrifugeClientDelegate
- (void)clientWithDidReceiveError:(NSError * _Nonnull)error;
- (void)clientWithDidReceiveRefresh:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidDisconnect:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
- (void)clientWithDidSendMessage:(NSString * _Nullable)uid error:(NSError * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body;
@end


SWIFT_PROTOCOL("_TtP8EVSocket31ELPublicResponseMessageDelegate_")
@protocol ELPublicResponseMessageDelegate
- (void)clientWithDidReceiveResponseMessage:(NSString * _Nullable)uid error:(NSString * _Nullable)error body:(NSDictionary<NSString *, id> * _Nullable)body method:(NSString * _Nonnull)method;
@end


@interface NSError (SWIFT_EXTENSION(EVSocket))
@end

enum WebSocketReadyState : NSInteger;

/// WebSocket objects are bidirectional network streams that communicate over HTTP. RFC 6455.
SWIFT_CLASS("_TtC8EVSocket9WebSocket")
@interface WebSocket : NSObject
@property (nonatomic, readonly) NSInteger hashValue;
/// Create a WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond.
- (nonnull instancetype)init:(NSString * _Nonnull)url;
/// Create a WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond.
- (nonnull instancetype)initWithUrl:(NSURL * _Nonnull)url;
/// Create a WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond. Also include a list of protocols.
- (nonnull instancetype)init:(NSString * _Nonnull)url subProtocols:(NSArray<NSString *> * _Nonnull)subProtocols;
/// Create a WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond. Also include a protocol.
- (nonnull instancetype)init:(NSString * _Nonnull)url subProtocol:(NSString * _Nonnull)subProtocol;
/// Create a WebSocket connection from an NSURLRequest; Also include a list of protocols.
- (nonnull instancetype)initWithRequest:(NSURLRequest * _Nonnull)request subProtocols:(NSArray<NSString *> * _Nonnull)subProtocols OBJC_DESIGNATED_INITIALIZER;
/// Create a WebSocket object with a deferred connection; the connection is not opened until the .open() method is called.
- (nonnull instancetype)init;
/// The URL as resolved by the constructor. This is always an absolute URL. Read only.
@property (nonatomic, readonly, copy) NSString * _Nonnull url;
/// A string indicating the name of the sub-protocol the server selected; this will be one of the strings specified in the protocols parameter when creating the WebSocket object.
@property (nonatomic, readonly, copy) NSString * _Nonnull subProtocol;
/// Allow for Self-Signed SSL Certificates. Default is false.
@property (nonatomic) BOOL allowSelfSignedSSL;
/// The queue for firing off events. default is main_queue
@property (nonatomic, strong) dispatch_queue_t _Nullable eventQueue;
/// The current state of the connection; this is one of the WebSocketReadyState constants. Read only.
@property (nonatomic, readonly) enum WebSocketReadyState readyState;
/// Opens a deferred or closed WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond.
- (void)open:(NSString * _Nonnull)url;
/// Opens a deferred or closed WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond.
- (void)openWithNsurl:(NSURL * _Nonnull)url;
/// Opens a deferred or closed WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond. Also include a list of protocols.
- (void)open:(NSString * _Nonnull)url subProtocols:(NSArray<NSString *> * _Nonnull)subProtocols;
/// Opens a deferred or closed WebSocket connection to a URL; this should be the URL to which the WebSocket server will respond. Also include a protocol.
- (void)open:(NSString * _Nonnull)url subProtocol:(NSString * _Nonnull)subProtocol;
/// Opens a deferred or closed WebSocket connection from an NSURLRequest; Also include a list of protocols.
- (void)openWithRequest:(NSURLRequest * _Nonnull)request subProtocols:(NSArray<NSString *> * _Nonnull)subProtocols;
/// Opens a closed WebSocket connection from an NSURLRequest; Uses the same request and protocols as previously closed WebSocket
- (void)open;
/// Closes the WebSocket connection or connection attempt, if any. If the connection is already closed or in the state of closing, this method does nothing.
/// :param: code An integer indicating the status code explaining why the connection is being closed. If this parameter is not specified, a default value of 1000 (indicating a normal closure) is assumed.
/// :param: reason A human-readable string explaining why the connection is closing. This string must be no longer than 123 bytes of UTF-8 text (not characters).
- (void)close:(NSInteger)code reason:(NSString * _Nonnull)reason;
/// Transmits message to the server over the WebSocket connection.
/// :param: message The message to be sent to the server.
- (void)send:(id _Nonnull)message;
/// Transmits a ping to the server over the WebSocket connection.
/// :param: optional message The data to be sent to the server.
- (void)ping:(id _Nonnull)message;
/// Transmits a ping to the server over the WebSocket connection.
- (void)ping;
@end

@protocol WebSocketDelegate;

@interface WebSocket (SWIFT_EXTENSION(EVSocket))
/// The events of the WebSocket using a delegate.
@property (nonatomic, strong) id <WebSocketDelegate> _Nullable delegate;
/// Transmits message to the server over the WebSocket connection.
/// :param: text The message (string) to be sent to the server.
- (void)sendWithText:(NSString * _Nonnull)text;
/// Transmits message to the server over the WebSocket connection.
/// :param: data The message (binary) to be sent to the server.
- (void)sendWithData:(NSData * _Nonnull)data;
@end


/// WebSocketDelegate is an Objective-C alternative to WebSocketEvents and is used to delegate the events for the WebSocket connection.
SWIFT_PROTOCOL("_TtP8EVSocket17WebSocketDelegate_")
@protocol WebSocketDelegate
/// A function to be called when the WebSocket connection’s readyState changes to .Open; this indicates that the connection is ready to send and receive data.
- (void)webSocketOpen;
/// A function to be called when the WebSocket connection’s readyState changes to .Closed.
- (void)webSocketClose:(NSInteger)code reason:(NSString * _Nonnull)reason wasClean:(BOOL)wasClean;
/// A function to be called when an error occurs.
- (void)webSocketError:(NSError * _Nonnull)error;
@optional
/// A function to be called when a message (string) is received from the server.
- (void)webSocketMessageText:(NSString * _Nonnull)text;
/// A function to be called when a message (binary) is received from the server.
- (void)webSocketMessageData:(NSData * _Nonnull)data;
/// A function to be called when a pong is received from the server.
- (void)webSocketPong;
/// A function to be called when the WebSocket process has ended; this event is guarenteed to be called once and can be used as an alternative to the “close” or “error” events.
- (void)webSocketEnd:(NSInteger)code reason:(NSString * _Nonnull)reason wasClean:(BOOL)wasClean error:(NSError * _Nullable)error;
@end

/// The WebSocketReadyState enum is used by the readyState property to describe the status of the WebSocket connection.
typedef SWIFT_ENUM(NSInteger, WebSocketReadyState) {
/// The connection is not yet open.
  WebSocketReadyStateConnecting = 0,
/// The connection is open and ready to communicate.
  WebSocketReadyStateOpen = 1,
/// The connection is in the process of closing.
  WebSocketReadyStateClosing = 2,
/// The connection is closed or couldn’t be opened.
  WebSocketReadyStateClosed = 3,
};

#pragma clang diagnostic pop
