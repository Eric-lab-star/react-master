import styled from "styled-components";
import Circle from "./Circle";
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
`;

export default function App() {
  return (
    <Container>
      <Circle bgColor="red" />
    </Container>
  );
}
