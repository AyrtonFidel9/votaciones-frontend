import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { BarChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Legend } from "recharts";
import { Bar } from "recharts";
import { Tooltip } from "recharts";

const generarColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

export default function CardBarChart ({ data, titulo, ancho, alto, label }){
    return (
        <Card elevation={4} sx={{
            width: `${ancho*1.10}px`
        }}>
            <CardContent>
                <Stack spacing={3}>
                    <Typography
                        sx={{ fontSize: 18, fontWeight: 'bold' }} 
                        color="text.primary" 
                        align='center'
                    >
                        {titulo}
                    </Typography>
                    <BarChart width={ancho} height={alto} data={data}
                        style={{ placeSelf: 'center',fontFamily: 'Roboto' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={label}/>
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={label} fill={`#${generarColor()}`} />
                    </BarChart>
                </Stack>
            </CardContent>
        </Card>
    );
}