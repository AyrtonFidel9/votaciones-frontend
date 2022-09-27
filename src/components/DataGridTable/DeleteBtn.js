import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function DeleteBtn(props){
    return (
        <IconButton aria-label="delete" size="large"
            onClick={props.onClick} sx={{
                "&:hover": {
                    color: '#BF0000',
                }
            }}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
    );

}