import React from "react";
import { Chip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CancelIcon from '@mui/icons-material/Cancel';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export default function ChipTable (props){
    const {
        icon,
        text,
        size,
        color,
        key
    } = props;

    const icons = [
        {name: 'check', value: CheckCircleIcon},
        {name: 'error', value: ErrorIcon},
        {name: 'live', value: RadioButtonCheckedIcon},
        {name: 'cancel', value: CancelIcon},
        {name: 'stop', value: StopCircleIcon},
        {name: 'pendiente', value: HourglassTopIcon}
    ];

    const RealIcon = icons.find(ic=>ic.name===icon).value;

    return (
        <Chip
            key={key}
            label={text}
            variant="outlined"
            icon={<RealIcon/>}
            size={size}
            color={color}
        />
    );
}