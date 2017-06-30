#import "RCTEasyVaas.h"
#import "EVPlayer.h"

@implementation RCTEasyVaas

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super init])) {
        self.player = [[EVPlayer alloc] init];
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    [CATransaction begin];
    [CATransaction setAnimationDuration:0];
    self.player.playerViewFrame = self.bounds;
    self.player.playerContainerView = self;
    [CATransaction commit];
}

- (void)setUpPlayer:(NSString *)id isLive:(BOOL)isLive
{
    self.player.lid = id;
    self.player.live = isLive;
    self.player.delegate = self;
}

-(void)play
{
    __weak typeof(self) wSelf = self;
    [self.player playPrepareComplete:^(EVPlayerResponseCode responseCode, NSDictionary *result, NSError *err) {
        __strong typeof(wSelf) sSelf = wSelf;
        if (responseCode == EVPlayerResponse_Okay) {
            [sSelf.player play];
        }
        else {
            NSLog(@"%@", result);
            NSLog(@"%@", err);
        }
    }];
}

- (void)sendPlayerState:(NSString *)state
{
    NSLog(@"send");
    if(self.onPlayerStateChange) {
        NSLog(@"%@", state);
        self.onPlayerStateChange(@{@"playerState":state});
    }
}

- (void)EVPlayer:(EVPlayer *)player didChangedState:(EVPlayerState)state
{
    NSLog(@"%@", @(state));
    switch (state) {
        case EVPlayerStatePlaying:
            [self sendPlayerState:@"正在播放"];
            break;
        case EVPlayerStateBuffering:
            [self sendPlayerState:@"正在缓冲"];
            break;
        case EVPlayerStateComplete:
            [self sendPlayerState:@"播放结束"];
            break;
        case EVPlayerStateConnectFailed:
            [self sendPlayerState:@"连接失败"];
            break;
        default:
            break;
    }
}

@end
