import React, { useEffect, useRef } from "react";
import { Carrusel } from "../../styled-components";
import ButtonLeftWithIcon from "./ButtonLeftWithIcon";
import ButtonRightWithIcon from "./ButtonRightWithIcon";


export default function CarruselContent ({Content}) {

    const carruselRef = useRef(null);

    const scrollDistance = 350;

    useEffect(()=>{
        carruselRef.current.scrollLeft += 8;
    },[]);


    const moveScrollRight = () => {
        carruselRef.current.scrollLeft += scrollDistance;
    }

    const moveScrollLeft = () => {
        carruselRef.current.scrollLeft -= scrollDistance;
    }

    return (
        <Carrusel ref={carruselRef}>
            <ButtonLeftWithIcon onClick={moveScrollLeft}/>
            <Content/>
            <ButtonRightWithIcon onClick={moveScrollRight}/>
        </Carrusel>
    );
}