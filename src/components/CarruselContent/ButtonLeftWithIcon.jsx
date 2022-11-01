import React from 'react';
import { ButtonsCarrusel } from '../../styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ButtonLeftWithIcon ({onClick}){
    return (
        <ButtonsCarrusel style={{left: 0,}}
            onClick={onClick}
        >
            <ArrowBackIosIcon/>
        </ButtonsCarrusel>
    );
}