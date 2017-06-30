#import <React/RCTView.h>
#import "EVPlayer.h"

@class RCTEventDispatcher;

@interface RCTEasyVaas : UIView <EVPlayerDelegate>

@property (nonatomic, strong) EVPlayer *player;

@property (nonatomic, copy) RCTBubblingEventBlock onPlayerStateChange;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

- (void)setUpPlayer:(NSString *)id isLive:(BOOL)isLive;

- (void)play;

@end
