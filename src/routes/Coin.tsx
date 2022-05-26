import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  useParams,
  useLocation,
  Outlet,
  NavLink,
  Link,
  useOutletContext,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CoinInfoAPI, CoinPriceInfoAPI } from "../api";

// styled-components

const BTN = styled.button`
  border-style: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
  margin: 3px;
  width: 220px;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
`;
const Header = styled.div`
  margin: 10px 0px;
`;
const Title = styled.h1`
  font-family: ohm-bold;
  font-weight: 700;
  font-size: 60px;
  text-align: center;
  margin: 20px;
  color: ${(props) => props.theme.accentColor};
`;
const rotate = keyframes`
  from{
    transform: rotate(0deg)
  } to{
    transform: rotate(360deg);
  }
`;
const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.accentColor};
  animation: ${rotate} 1s linear infinite;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
`;

const InfoContainer = styled.div`
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.bgColor};
  min-width: 200px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0px;
  & a {
    min-width: fit-content;
    &.activeTab {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  & span:first-child {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 10px 0px;
  font-size: 15px;
  text-align: start;
  word-break: break-all;
`;
//interface

interface RouteState {
  name: string;
}
interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  total_supply: number;
  max_supply: number;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const state = useLocation().state as RouteState;

  const { coinId } = useParams();

  const { data: priceInfo } = useQuery<PriceInfo>(
    ["coin", coinId],
    () => CoinPriceInfoAPI(coinId),
    {
      cacheTime: 3000,
    }
  );
  const { isLoading: isLoadingInfo, data: coinInfoData } = useQuery<CoinInfo>(
    ["info", coinId],
    () => CoinInfoAPI(coinId),
    { cacheTime: 3000 }
  );

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : isLoadingInfo
            ? "Loading"
            : coinInfoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : isLoadingInfo
            ? "Loading"
            : coinInfoData?.name}
        </Title>
      </Header>
      <BTN>
        <Link to=".."> &larr; Go Back to Coins List</Link>
      </BTN>
      {isLoadingInfo ? (
        <Loading />
      ) : (
        <>
          <InfoContainer>
            <Infos>
              <span>RANK:</span>
              <span>{coinInfoData?.rank}</span>
            </Infos>
            <Infos>
              <span>SYMBOL:</span>
              <span>{coinInfoData?.symbol}</span>
            </Infos>
            <Infos>
              <span>OPEN SOURCE:</span>
              <span>{coinInfoData?.open_source ? "YES" : "NO"}</span>
            </Infos>
          </InfoContainer>
          <Description>{coinInfoData?.description}</Description>
          <InfoContainer>
            <Infos>
              <span>TOTAL SUPPLY</span>
              <span>{priceInfo?.total_supply}</span>
            </Infos>

            <Infos>
              <span>MAX SUPPLY</span>
              <span>{priceInfo?.max_supply}</span>
            </Infos>
          </InfoContainer>
          <InfoContainer>
            <NavLink
              to="chart"
              className={({ isActive }) => (isActive ? "activeTab" : undefined)}
            >
              Chart
            </NavLink>
            <NavLink
              to="supply"
              className={({ isActive }) => (isActive ? "activeTab" : undefined)}
            >
              Supply
            </NavLink>
          </InfoContainer>
        </>
      )}
      <Outlet context={{ coinId }} />
    </Container>
  );
}
interface ICoinId {
  coinId: string | null;
}
export function useCoinId() {
  return useOutletContext<ICoinId>();
}
