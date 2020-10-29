import styled from 'styled-components';

export const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
  }
`;

export const FormControl = styled.div`
  margin-bottom: 1rem;

  input,
  label {
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

export const LoginForm = styled.div`
  width: 27em;
  height: 33em;
  /* min-height: 44em; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  position: relative;
  z-index: 1;

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 0px 12px 2px rgba(15, 15, 15, 0.2);
    border-radius: 4px;
    position: relative;
    z-index: 99;
    width: 100%;
    height: 100%;
    z-index: 99;
    padding: 17px 10px;
    /* transition: transform 200ms ease-in-out; */
  }
  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90%;
    background-color: #0d7ddc;
    width: 100%;
    position: absolute;
    right: -34%;
    border-radius: 6px;
    z-index: 1;
    transition: all 400ms ease-in-out;
    cursor: pointer;
    box-shadow: 0px 0px 12px 2px rgba(15, 15, 15, 0.281);

    &.right {
      right: -40%;
      align-items: flex-end;
      &:hover {
        right: -45%;
      }
    }
    &.left {
      right: 40%;
      align-items: flex-start;
      &:hover {
        right: 45%;
      }
    }

    .text {
      font-size: 21px;
      font-weight: 500;
      color: #fff;
      margin-right: 3em;
      margin-left: 3em;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
  }

  .image {
    width: 11em;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .form {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: fit-content;

      label {
        font-size: 20px;
      }

      input {
        margin-top: 6px;
        min-width: 18em;
        height: 37px;
        padding: 0 10px;
        font-size: 16px;
        background-color: #f3f3f3;
        border: 0;
        border-radius: 4px;
        margin-bottom: 30px;
        transition: all 250ms ease-out;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 12px 0.8px #0d7ddc;
        }
      }
    }
    .footer {
      margin-top: 1em;

      .btn {
        font-size: 21px;
        padding: 5px 20px;
        border: 0;
        background-color: #0d7ddc;
        color: #fff;
        border-radius: 3px;
        transition: all 250ms ease-in-out;
        cursor: pointer;
        &:hover {
          background-color: #1c82d8;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
`;
