import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import CircleIcon from "@mui/icons-material/Circle";
import Paper from "@mui/material/Paper";

const COLORS = ["#01A610", "#AD0000"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CardPastelChart({
  data,
  titulo,
  fecha,
  nombre,
  agencia,
  altura,
  innerRef,
}) {
  return (
    <Card elevation={4}>
      <CardContent
        ref={(el) => {
          if (innerRef) {
            innerRef.current = el;
          }
        }}
      >
        <Typography
          sx={{ fontSize: 18, fontWeight: "bold" }}
          color="text.primary"
          align="center"
        >
          {titulo}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "0 auto",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              placeSelf: "center",
              height: "100%",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                paddingLeft: 4,
              }}
            >
              <Typography>
                <b>Nombre: </b>
                {nombre}
              </Typography>
              <Typography>
                <b>Fecha: </b>
                {fecha}
              </Typography>
              <Typography>
                <b>Agencia: </b>
                {agencia}
              </Typography>
              <br />
              <br />
              <Typography
                sx={{
                  display: "flex",
                }}
              >
                <CircleIcon
                  sx={{
                    color: "#AD0000",
                    display: "flex",
                    paddingRight: 1,
                  }}
                />
                Socios que no votaron
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                }}
              >
                <CircleIcon
                  sx={{
                    color: "#01A610",
                    display: "flex",
                    paddingRight: 1,
                  }}
                />
                Socios que votaron
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              placeContent: "center",
            }}
          >
            <ResponsiveContainer
              width={200}
              height={200}
              style={{
                margin: "0 auto",
              }}
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
