import styled from 'styled-components';

export const Container = styled.form`
  width: 35rem;
  max-width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
  }
`;

export const FormControl = styled.div`
  text-align: center;
  margin: 0.8rem auto;
  width: 30rem;
  max-width: 80%;
  input,
  label,
  textarea {
    width: 100%;
    display: block;
  }
  label {
    margin-bottom: 0.5rem;
  }
`;
export const FormActions = styled.div`
  text-align: center;
  button,
  .btn {
    background-color: #0d7ddc;
    font: inherit;
    border: 1px solid #0d7ddc;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    margin-right: 1rem;
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

export const Events = styled.div`
  margin: 2rem auto;
  width: 40rem;
  max-width: 90%;
`;
