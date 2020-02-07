# futuremaker 비주얼라이저

## 1. Binance UDF 도커 실행

https://github.com/bergusman/tradingview-udf-binance-node 를 빌드해서 하나 띄운다.

Docker
$ docker build . -t udf
$ docker run -p 8080:80 udf
테스트: http://localhost/symbols?symbol=BTCUSDT

## 2. mobile.html에 url 설정.

```
datafeed: new Datafeeds.UDFCompatibleDatafeed("http://localhost")
symbol: 'BTCUSDT',
interval: '1h',
```

(옵션)

test로 확인해보려면 

```
$ npm install -g http-server
$ http-server -p 3000
```

http://localhost:3000/mobile.html 에 접근해본다.

## 3. futuremaker의 트레이딩 결과json 표시 (tab1)

futuremaker-json/trade-EveryGo.json 을 사용.


## 4. 테이블 형식의 트레이딩 결과는 다른 탭으로 표시. (tab2)

상단에는 futuremaker-json/status-EveryGo.json 파일로 요약을 보여주고 하단에는 TABLE형식으로 trade-EveryGo.json을 보여준다.

## 기타

- 차트는 기본으로 1H을 보여주고 차트에서 변경할수 있게 한다.
- 인디케이터 데이터는 datafeed api에 포함된것 같으며, 나중에 고려한다.
