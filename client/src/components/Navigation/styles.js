import styled from 'styled-components';

export const Navigiation = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: #0d7ddc;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 99;
`;

export const Logo = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #000;
  }
`;

export const NavItems = styled.nav`
  margin-left: 1.5rem;
  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    margin: 0 1rem;
  }
  a,
  button {
    text-decoration: none;
    color: #000;
    padding: 0.25rem 0.5rem;
    border: none;
    font: inherit;
    font-weight: bold;
    background: transparent;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
  }
  a:hover,
  a:active,
  button:hover,
  button:active {
    color: #fff;
  }
  a.active {
    color: #fff;
  }
`;
