## Usage -

### Getting trading symbols using cc

> cc - stands for crypto-currency, a 'cc' pair consists of Base currency and Quote currency, like in BTCUSDT - BTC is Base currency and USDT is Quote currency. In most cases the Quote currency is used to find respective cc pairs.

On successful implementation, a json response is returned which contains the list of symbols sorted in order of decreasing volume.

> Switch 'usdt' or 'base' as per your liking.

#### 1. crypto-currency pairs by their Quote (mainly used) \*

```
http://localhost:3000/?quote=usdt
```

#### 2. crypto-currency pairs by their Base

```
http://localhost:3000/?base=btc
```
