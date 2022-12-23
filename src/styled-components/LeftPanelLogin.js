import styled from "styled-components";
import imgLogin from '../pages/Login/assets/login-fondo.png';

const LeftPanelLogin= styled.div`
    width: 60vw;
    background-image: url(${imgLogin});
    background-repeat: no-repeat;
    background-size: cover;
    text-align: left;
    color: white;
    text-shadow: 1px 1px 5px black;
    font-size: 36px;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

export default LeftPanelLogin;