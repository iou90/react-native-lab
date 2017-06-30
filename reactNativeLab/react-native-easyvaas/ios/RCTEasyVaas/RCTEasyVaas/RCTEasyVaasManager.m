#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import "RCTEasyVaas.h"
#import "EVSDKManager.h"

@interface RCTEasyVaasManager : RCTViewManager
@end

@implementation RCTEasyVaasManager

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(onPlayerStateChange, RCTBubblingEventBlock);

- (void)initSDKError:(NSNotification *)notification{
    NSLog(@"初始化SDK失败");
    NSLog(@"---notification:%@", notification);
}

- (void)initSDKSuccess{
    NSLog(@"初始化SDK成功");
}

- (UIView *)view
{
    return [[RCTEasyVaas alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

- (void)dealloc
{
    NSLog(@"dealloc");
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

RCT_EXPORT_METHOD(initSdk:(NSString *)appId appKey:(NSString *)appKey appSecrete:(NSString *)appSecrete userId:(NSString *)userId)
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(initSDKSuccess) name:EVSDKInitSuccessNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(initSDKError:) name:EVSDKInitErrorNotification object:nil];
    [EVSDKManager initSDKWithAppID:appId appKey:appKey appSecret:appSecrete userID:userId];
}

RCT_EXPORT_METHOD(setUpPlayer:(nonnull NSNumber *)reactTag id:(NSString *)id isLive:(BOOL)isLive)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTEasyVaas *> *viewRegistry) {
        RCTEasyVaas *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[RCTEasyVaas class]]) {
            RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
        } else {
            [view setUpPlayer:id isLive:isLive];
        }
    }];
}

RCT_EXPORT_METHOD(play:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTEasyVaas *> *viewRegistry) {
        RCTEasyVaas *view = viewRegistry[reactTag];
        if (![view isKindOfClass:[RCTEasyVaas class]]) {
            RCTLogError(@"Invalid view returned from registry, expecting RCTWebView, got: %@", view);
        } else {
            [view play];
        }
    }];
}

@end
