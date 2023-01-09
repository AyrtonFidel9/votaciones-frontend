import styled from "styled-components";
import AnularBtn from "./AnularBtn";
import SeleccionarBtn from "./SeleccionarBtn";

const InputRadio = styled.input`
    &:checked + div{
        background-color: #BEFFBD;
    }

    &:checked + div ${AnularBtn}{
        display: inline-flex !important;
    }

    &:checked + div ${SeleccionarBtn}{
        display: none;
    }
`;

export default InputRadio;