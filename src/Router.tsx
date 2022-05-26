import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Supply from "./routes/Supply";
import { theme, darkTheme } from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
// styled-components
const ResetCss = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body {
	line-height: 1;
	color: ${(props) => props.theme.color};
	background-color: ${(props) => props.theme.bgColor};
	display:flex;
	justify-content:center;
	align-items:center;
}
a{
	text-decoration: none;
	color: inherit;
	display:flex;
	align-items:center;
	justify-content:space-between;
	min-width: 100px;
}


`;

const BTN = styled.button`
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.color};
  border-style: none;
  z-index: 1;
  position: relative;
  top: 120px;
  left: -70px;
  border-radius: 10px;
  font-size: 18px;
`;

const queryClient = new QueryClient();

function Router() {
  const [isClicked, setClicked] = useState<boolean>(false);
  const onClick = () => {
    setClicked((pre) => (pre = !pre));
  };

  return (
    <ThemeProvider theme={isClicked ? darkTheme : theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <ResetCss />
          <BTN onClick={onClick}>
            {isClicked ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </BTN>
          <Routes>
            <Route path="/" element={<Coins />} />
            <Route path=":coinId" element={<Coin />}>
              <Route path="supply" element={<Supply />} />
              <Route path="chart" element={<Chart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Router;
