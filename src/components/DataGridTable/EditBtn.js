import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function EditBtn(props){
    return (
        <IconButton aria-label="edit" size="large" 
        onClick={props.onClick}
        sx={{
            "&:hover": {
                color: '#BD6A00',
            }
        }}>
            <EditIcon fontSize="inherit" />
        </IconButton>
    );
}