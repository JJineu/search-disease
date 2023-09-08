import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
:root {
  --black: #000;
  --white: #fff;
  --gray: #808080;
  --lightGray: #ededed;
  --blue: #435fff;
  --skyBlue: #c2e9f4;
  --grayBlue: #afd2e1de;
  font-size: 16px;
}
body {
  background-color: var(--skyBlue);
  margin: 0;
  font-family: 'SpoqaHanSansNeo';
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  border: 0;
  padding: 0;
  background: transparent;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
img {
  width: 100%;
  vertical-align: middle;
}
svg {
  vertical-align: middle;
}
input {
  background: unset;
  border: unset;
  font: inherit;
}
textarea {
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  font: inherit;
}
.a11y {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
`;

export default GlobalStyle;
