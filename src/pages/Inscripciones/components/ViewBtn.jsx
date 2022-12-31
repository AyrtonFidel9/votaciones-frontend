import React from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

export default function ViewBtn(props){
    const navigate = useNavigate();

    return (
        <IconButton aria-label="edit" size="large" 
        onClick={()=>{
            navigate(props.ruta, {state: props.row});
        }}
        sx={{
            "&:hover": {
                color: '#1769aa',
            }
        }}>
            <VisibilityIcon fontSize="inherit" />
        </IconButton>
    );
}