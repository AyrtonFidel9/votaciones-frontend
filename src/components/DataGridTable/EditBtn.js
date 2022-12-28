import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export default function EditBtn(props){
    const navigate = useNavigate();

    return (
        <IconButton aria-label="edit" size="large" 
        onClick={()=>{
            navigate(props.ruta, {state: props.row});
        }}
        sx={{
            "&:hover": {
                color: '#BD6A00',
            }
        }}>
            <EditIcon fontSize="inherit" />
        </IconButton>
    );
}