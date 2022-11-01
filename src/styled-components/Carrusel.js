import styled from "styled-components";

const Carrusel = styled.div`
    display: flex;
    margin: 7px;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 10px;
    }
`;

export default Carrusel;