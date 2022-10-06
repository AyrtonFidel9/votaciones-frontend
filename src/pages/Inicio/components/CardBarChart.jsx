import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { BarChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Legend } from "recharts";
import { Bar } from "recharts";
import { Tooltip } from "recharts";

export default function CardBarChart ({ data, titulo, ancho, alto }){
    return (
        <Card elevation={4} sx={{
            width: `${ancho*1.10}px`
        }}>
            <CardContent>
                <Stack spacing={3}>
                    <Typography
                        sx={{ fontSize: 18 }} 
                        color="text.primary" 
                        align='center'
                    >
                        {titulo}
                    </Typography>
                    <BarChart width={ancho} height={alto} data={data}
                        style={{ placeSelf: 'center' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="candidatos" fill="#5F34E0" />
                    </BarChart>
                </Stack>
            </CardContent>
        </Card>
    );
}