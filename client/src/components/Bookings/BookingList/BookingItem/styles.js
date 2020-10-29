import styled from 'styled-components';

export const BookingItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #0d7ddc;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1rem;
    color: #0d7ddc;
    text-transform: capitalize;
  }

  h2 {
    margin: 0;
    font-size: 0.75rem;
    color: #7c7c7c;
  }

  p {
    margin: 0;
  }
  button,
  .btn {
    background-color: #0d7ddc;
    font: inherit;
    border: 1px solid #0d7ddc;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;
    margin-left: 1rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
    color: #fff;
    cursor: pointer;
  }
  button:hover,
  button:active {
    background-color: #1c82d8;
    border-color: #1c82d8;
  }
  .href {
    background: transparent;
    border: 0;
    box-shadow: none;
    color: #000;
  }
  .href:hover {
    background: transparent;
    color: #0d7ddc;
  }
`;
