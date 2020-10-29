import styled from 'styled-components';

export const BookingsControls = styled.div`
  text-align: center;
  padding: 0.5rem;

  button {
    font: inherit;
    border: none;
    background: transparent;
    color: #000;
    padding: 0.25rem 3rem;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }

  button.active {
    border-bottom-color: #0d7ddc;
    color: #0d7ddc;
  }

  button:focus {
    outline: none;
  }
`;
