import React from 'react';

import SearchPage from './pages/SearchPage';

import GlobalStyle from './styles/style.js';
import styled from 'styled-components';
import { SearchProvider } from './context/searchContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>
          국내 모든 임상시험을 검색하고 <br /> <br /> 온라인으로 참여하기
        </Title>
        <SearchProvider>
          <SearchPage />
        </SearchProvider>
      </Container>
    </>
  );
}

export default App;

const Title = styled.p`
  padding: 40px;
  text-align: center;
  font-size: xx-large;
  font-weight: bold;
  line-height: 1;
`;
const Container = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
