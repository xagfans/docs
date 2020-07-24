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
