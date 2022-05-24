import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

interface RouteState {
  name: string;
}
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
export default function Coin() {
  const location = useLocation();
  const state = location.state as RouteState;

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
    </Container>
  );
}
