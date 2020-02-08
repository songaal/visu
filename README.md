# futuremaker 비주얼라이저

## 1. Binance UDF 준비

이미 만들어둔 API를 사용한다.  

http://13.124.177.37:8080

테스트: http://13.124.177.37:8080/symbols?symbol=BTCUSDT

만약 자신만의 udf 서버를 따로 띄우고 싶다면 아래를 참고한다.

https://github.com/bergusman/tradingview-udf-binance-node


## 2. mobile.html에 url 설정.

```
datafeed: new Datafeeds.UDFCompatibleDatafeed("http://13.124.177.37:8080")
symbol: 'BTCUSDT',
interval: '1h',
```

(옵션)

로컬에 http 서버를 띄워서 확인해보려면 

```
$ npm install -g http-server
$ http-server -p 3000
```

http://localhost:3000/mobile.html 에 접근해본다.



## 3. futuremaker의 트레이딩 결과json 표시 (1번 탭으로)

futuremaker-json/trade-EveryGo.json 을 사용.


## 4. 테이블 형식의 트레이딩 결과는 다른 탭으로 표시. (2번 탭으로)

상단에는 futuremaker-json/status-EveryGo.json 파일로 요약을 보여주고 하단에는 TABLE형식으로 trade-EveryGo.json을 보여준다.

## 기타

- 차트는 기본 1H을 보여주고 차트에서 변경할수 있게 한다.
- 인디케이터는 나중에 고려한다.
