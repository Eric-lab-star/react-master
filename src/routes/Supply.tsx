import { useCoinId } from "./Coin";

export default function Supply() {
  const { coinId } = useCoinId();

  return <div>{coinId}: Supply</div>;
}
