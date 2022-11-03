import { createGlobalStyle } from "styled-components";

export const CartBuySuccessStyle = createGlobalStyle`
.success-wrapper, .cancel-wrapper{
    background-color: white;
    min-height: 60vh;

  }
  .success, .cancel{
    width: 1000px;
  margin: auto;
  margin-top: 100px;
    background-color: #dcdcdc;
    padding: 50px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom:2rem;
  }

  .success .icon {
     color: green;
     font-size: 40px;
  }
  .success h2{
    text-transform: capitalize;
    margin-top: 15px 0px;
    font-weight: 900;
    font-size: 40px;
    color:#324d67;
  }
  .success .email-msg{
     font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
  .cancel p{
    font-size: 20px;
    font-weight: 600;
  }
  .success .description{
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 10px;
    margin-top: 30px;
  }
  .success .description .email{
    margin-left: 5px;
    color: #f02d34;
  }

  .btn{
    width: 100%;
    max-width: 400px;
    padding: 10px 12px;
    border-radius: 15px;
    border: none;
    font-size: 20px;
    margin-top: 10px;
    margin-top: 40px;
    text-transform: uppercase;
    background-color: #f02d34;
    color: #fff;
    cursor: pointer;
      transform: scale(1, 1);
    transition: transform 0.5s ease;
  }
  .btn:hover{
    transform: scale(1.1,1.1);
    color: #fff;
  }
  @media screen and (max-width:800px) {
  .success-wrapper, .cancel-wrapper{

    min-height: 69vh;
  }
  .success, .cancel {
     width: 370px;
    margin-top: 100px;
    padding: 20px;
  }
  .success{
    height: 350px;
  }
  .success h2{
    font-size: 17px;
  }
  .btn-container{
    width: 300px;
    margin: auto;
  }
`;
