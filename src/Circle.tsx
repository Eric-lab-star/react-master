import styled from "styled-components";

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;
interface ContainerProps {
  bgColor: string;
}

interface CircleProps {
  bgColor: string;
}

export default function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
