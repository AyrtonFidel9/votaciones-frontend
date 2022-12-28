import React, { useRef, forwardRef, useImperativeHandle, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { resetConfirmDeleted } from "../redux/states/confirmDelete";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDelete = forwardRef(({mensaje, eliminar}, ref ) => {
    
    const [open, setOpen] = useState(false);
    const [ desicion, setDesicion ] =  useState(false);
    const innerRef = useRef();
    const id = useSelector(store => store.confirmDeleted.idDelete);
    const dispatch = useDispatch();

    const handleDialogClose = () => {
        setOpen(false);
    };

    const confirmDeleted = () => {
        setOpen(false);
        eliminar(id);
        dispatch(resetConfirmDeleted());
    }
    

    useImperativeHandle(ref, () => ({
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false),
        changeDesicionFalse: () => setDesicion(false),
        getDesicion: () => desicion
    }));

    return (
        <Dialog
            ref={innerRef}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-delete"
        >
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <DeleteIcon sx={{
                        color: '#ab0000'
                    }}/>
                    {mensaje}
                </Box>
            </DialogTitle>
            <DialogActions>
                <Button color='secondary' onClick={handleDialogClose}>Cancelar</Button>
                <Button color="error" onClick={confirmDeleted}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
});

export default ConfirmDelete;


//            TransitionComponent={Transition}
