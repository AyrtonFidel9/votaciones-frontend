import React from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function DescargarBtn(props){
    return (
        <IconButton aria-label="edit" size="large" 
        onClick={props.onClick}
        sx={{
            "&:hover": {
                color: '#0075D7',
            }
        }}>
            <DownloadIcon fontSize="inherit" />
        </IconButton>
    );
}