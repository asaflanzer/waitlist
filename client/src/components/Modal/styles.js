import styled from 'styled-components';

export const Modal = styled.div`
  width: 90%;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: 5%;
  z-index: 100;

  @media (min-width: 768px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }

  .modal__header {
    padding: 1rem;
    background-color: #0d7ddc;
    color: #fff;

    h1 {
      margin: 0;
      font-size: 24px;
      color: #fff;
    }
  }

  .modal__content {
    padding: 1rem;
  }

  .modal__action {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

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
