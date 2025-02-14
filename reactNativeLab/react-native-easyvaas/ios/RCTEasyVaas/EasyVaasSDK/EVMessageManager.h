//
//  EVMessageManager.h
//  EVMessage
//
//  Created by Lcrnice on 2017/6/12.
//  Copyright © 2017年 cloudfocous. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EVMessageProtocol.h"
#import "EVMessageConfig.h"
#import "EVMessageModel.h"

typedef void(^EVMessageCallBack)(NSDictionary *response, NSError *error);

@interface EVMessageManager : NSObject

@property (nonatomic, weak) id<EVMessageProtocol> delegate;

+ (instancetype)shareManager;

///---------------------------
/// @name 聊天服务API
///---------------------------

/**
 连接 topic

 @param topic 想加入的topic
 */
- (void)connect:(NSString *)topic;

/**
 发送消息

 @param topic 所在topic
 @param message 发送的消息字符串
 @param userData 透传消息
 @param type 消息类型
 @param callBack 回调
 */
- (void)sendWithTopic:(NSString *)topic message:(NSString *)message userData:(NSDictionary *)userData type:(EVMessageType)type result:(EVMessageCallBack)callBack;

/**
 发送消息(全参数)

 @param topic 所在topic
 @param message 发送的消息字符串
 @param userData 透传消息
 @param type 消息类型
 @param level 消息等级
 @param save 是否保留为历史消息
 @param callBack 回调
 */
- (void)sendWithTopic:(NSString *)topic message:(NSString *)message userData:(NSDictionary *)userData type:(EVMessageType)type level:(EVMessageLevel)level save:(BOOL)save result:(EVMessageCallBack)callBack;

/**
 点赞操作

 @param topic 所在topic
 @param count 点赞数
 @param callBack 回调
 */
- (void)addLikeCountWithTopic:(NSString *)topic count:(NSUInteger)count result:(EVMessageCallBack)callBack;

/**
 获取最近的历史消息

 @param topic 所在topic
 @param count 历史消息数
 @param type 消息类型
 @param callBack 回调（字典中的历史消息是 EVMessageModel 对象）
 */
- (void)getLastHistoryMessageWithTopic:(NSString *)topic count:(NSUInteger)count type:(EVMessageType)type result:(EVMessageCallBack)callBack;

/**
 获取历史消息

 @param topic 所在topic
 @param start 开始位置
 @param count 历史消息数
 @param type 消息类型
 @param callBack 回调（字典中的历史消息是 EVMessageModel 对象）
 */
- (void)getHistoryMessageWithTopic:(NSString *)topic start:(NSUInteger)start count:(NSUInteger)count type:(EVMessageType)type result:(EVMessageCallBack)callBack;

/**
 离开 topic

 @param topic 所操作的topic
 @param callBack 回调
 */
- (void)leaveWithTopic:(NSString *)topic result:(EVMessageCallBack)callBack;

/**
 关闭连接
 */
- (void)closeConnect;

@end
