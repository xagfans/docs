# 交易所集成XAG指南

XAG在技术上源自于瑞波，因此可以复用瑞波应用代码或使用RippleAPI进行签名操作。假设交易所名字叫Alpha。那么集成XAG后，它将可以上线XAG/BTC，XAG/USD等交易对。为了集成，Alpha交易所必须：

* 在瑞波基因网络上创建XAG钱包。
* 对充值的钱包进行监控。
* 对用户的提现进行签名并发送XAG。

## 部分付款（Partial Payments）
在整合之前，交易所应了解*部分付款*功能。 此功能使XAG Ledger用户可以发送部分成功的付款，从而使收到的金额比SendMax更少。 此功能对于退回付款很有用，但对交易所而言却有巨大的风险。

## 部分付款警告
启用tfPartialPayment标志时，不能保证Amount字段是接收到的金额。 付款里的metadata的delivery_amount字段才是目标帐户实际收到的货币数量。 收到付款时，请使用Delivery_amount而不是Amount字段来确定您的帐户收到了多少XAG。

警告：
请注意，恶意行为者可以利用此漏洞。 更多信息，请参见[部分付款](https://dev.xagfans.com/partial-payments.html)。

## 用户进行XAG充值
当用户Charlie充值50000 XAG到Alpha交易所时，步骤如下：

 1. Charlie发送50000 XAG（通过钱包，RippleAPI或其他交易所）到Alpha交易所。Alpha交易所必须提供一个用于身份识别的标签号（destination tag），比如789。
 2. Alpha交易所的监控程序发现了收到了XAG，并识别到了标签号789，认可是充值到Charlie的账号。
 3. Alpha交易所给Charlie入账50000 XAG，然后Charlie就可以在交易所交易了。

交易所可以参考[监听](https://dev.xagfans.com/monitor-incoming-payments-with-websocket.html)。或者采用[account_tx](https://dev.xagfans.com/websocket-api-tool.html#account_tx)接口，进行轮循。

### 最佳实践

 1. 设上一次检查时间为t1，记录下t1的XAG数量。
 2. 当前检查时间为t2，记录下t2的XAG数量和t1到t2之间发生的N个payments。
 3. 对每个payment里的meta.delivered_amount进行检查，与tx.Amount进行对比。如果不一致，说明是有人使用部分付款进行攻击。
 4. 将N个payments里的meta.delivered_amount进行加总，并与t1,t2的XAG数量差值进行对比。加总数量应当于差值一致。
 
