const BASEURL = "https://api.coinpaprika.com/v1";

export function CoinsAPI() {
  return fetch(BASEURL + "/coins?").then((res) => res.json());
}
export function CoinInfoAPI(coinId: string | undefined) {
  return fetch(`${BASEURL}/coins/${coinId}`).then((res) => res.json());
}

export function CoinPriceInfoAPI(coinId: string | undefined) {
  return fetch(`
${BASEURL}/tickers/${coinId}`).then((res) => res.json());
}

export function CoinOHLCVAPI(coinId: string | null) {
  const today = new Date();
  const currentDate = today.getDate();
  const startDate = new Date(new Date().setDate(currentDate - 13));

  return fetch(
    `${BASEURL}/coins/${coinId}/ohlcv/historical?start=${startDate.toISOString()}&end=${today.toISOString()}`
  ).then((res) => res.json());
}
