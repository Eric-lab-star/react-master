import { useQuery } from "react-query";
import { CoinOHLCVAPI } from "../api";
import { useCoinId } from "./Coin";
import ApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { exec } from "apexcharts";

//interface
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

//styled-component

const ChartContianer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & .apexcharts-tooltip {
    background-color: #be2020;
    color: orange;
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }to{
    transform:rotate(360deg)
  }
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.accentColor};
  border-right: 2px solid transparent;
  border-left: 2px solid transparent;
  animation: ${rotate} 1s linear infinite;
`;

const BTN = styled.button`
  margin: 10px;
  border-style: none;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.color};
  font-size: 15px;
  border-radius: 5px;
  padding: 3px;
`;

//component
export default function Chart() {
  const { coinId } = useCoinId();
  const { isLoading, data: coinData } = useQuery<IData[]>(
    ["chart", coinId],
    () => CoinOHLCVAPI(coinId)
  );

  const [isClicked, setClicked] = useState(false);
  const chartId = "hello";
  const candleData = coinData?.map((v) => {
    const singleObj = {} as { x: Date; y: number[] };
    singleObj.y = [v.open, v.high, v.low, v.close];
    singleObj.x = new Date(v.time_close);
    return singleObj;
  });

  const onClick = () => {
    setClicked((pre) => (pre = !pre));
    if (isClicked) {
      ApexCharts.exec(chartId, "updateSeries", [
        { type: "candlestick", data: candleData },
      ]);
    } else {
      ApexCharts.exec(chartId, "updateSeries", [{ type: "bar" }]);
    }
  };
  return (
    <ChartContianer className={"Hello"}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ApexChart
            options={{
              chart: { id: chartId },
            }}
            series={[{ type: "bar", data: candleData as [] }]}
            width="500"
            height={500}
          />
        </div>
      )}
      <button onClick={onClick}>click</button>
    </ChartContianer>
  );
}
