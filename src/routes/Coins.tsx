import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CoinsAPI } from "../api";

//styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const CoinList = styled.ul``;

const Coin = styled.li`
  min-width: 150px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.bgColor};
  padding: 10px;
  margin: 5px;
  border-radius: 9px;
  font-family: itc-avant-garde-gothic-pro;
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  width: 15vw;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.color};
    transition: background-color 0.2s;
  }
`;
const rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to{
      transform:rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.accentColor};
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  animation: ${rotate} 1s linear infinite;
`;

const Img = styled.img`
  width: 2em;
  height: 2em;
`;

//interfaces
interface CoinsI {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// react component
export default function Coins() {
  const { isLoading, data } = useQuery<CoinsI[]>("coinsData", CoinsAPI);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <CoinList>
          {data?.slice(0, 100).map(function (coin) {
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <span>{coin.name} </span>
                  <Img
                    alt={coin.symbol}
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                </Link>
              </Coin>
            );
          })}
        </CoinList>
      )}
    </Container>
  );
}
