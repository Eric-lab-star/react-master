import { useQuery } from "react-query";
import { CoinOHLCVAPI } from "../api";
import { useCoinId } from "./Coin";
import ApexChart from "react-apexcharts";

interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart() {
  const { coinId } = useCoinId();
  const { isLoading, data: coinData } = useQuery<IData[]>(
    ["chart", coinId],
    () => CoinOHLCVAPI(coinId)
  );
  const highArray = coinData?.map((v) => v.volume) as number[];

  return (
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          width="500"
          type="line"
          series={[{ data: highArray }]}
          options={{
            chart: { id: "basic Chart" },
            xaxis: {
              categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            },
          }}
        />
      )}
    </div>
  );
}
