"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TemperatureData {
  id: number;
  date_time: string;
  room_temperature: number;
  temperature_1: number;
  temperature_2: number;
  container_id: number;
}

export function ChartTemperature({data}: {data: TemperatureData[]}) {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Temperaturas</CardTitle>
        <CardDescription>
          Variação das temperaturas ao longo do dia.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height="100%" minHeight={550}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="date_time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
              formatter={(value: number) => [`${value.toFixed(1)}°C`, ""]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="room_temperature"
              name="Temperatura Ambiente"
              stroke="#8884d8"
              fill="url(#colorRoom)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="temperature_1"
              name="Temperatura 1"
              stroke="#82ca9d"
              fill="url(#colorTemp1)"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="temperature_2"
              name="Temperatura 2"
              stroke="#ffc658"
              fill="url(#colorTemp2)"
              fillOpacity={0.3}
            />
            <defs>
              <linearGradient id="colorRoom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTemp1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTemp2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
