import React from 'react';
import { ButtonsCarrusel } from '../../styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ButtonRightWithIcon ({onClick}){
    return (
        <ButtonsCarrusel style={{right: 0,}}
            onClick={onClick}
        >
            <ArrowForwardIosIcon/>
        </ButtonsCarrusel>
    );
}