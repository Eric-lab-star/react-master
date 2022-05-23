import { useParams } from "react-router-dom";
export default function Coin() {
  const { coinId } = useParams();
  return <div>coinId : {coinId}</div>;
}
