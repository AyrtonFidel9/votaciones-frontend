import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';


const AlertaCustom = (props) => {
    const { isView, titulo, content, count, tipo, variante } = props.alerta;

    const [open, setOpen] = React.useState(isView);

    useEffect(() => { 
        setOpen(isView);
    }, [count]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity={tipo} onClose={handleClose} variant={variante} >
                <AlertTitle sx={{textAlign: 'left'}}>{titulo}</AlertTitle>
                {content}
            </Alert>
        </Snackbar>
    );

}

export default AlertaCustom;