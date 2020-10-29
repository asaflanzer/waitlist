import styled, { createGlobalStyle } from 'styled-components';

export const MainContent = styled.main`
  margin: 6rem 2.5rem;
  width: 100%;
  max-width: 1200px;
`;

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        /* font-family: 'Roboto', san-serif; */
    }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
