"use client";

import {
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Temperature = {
  containerId: string;
  dateTime: Date;
  id: number;
  roomTemperature: number;
  temperature1: number;
  temperature2: number;
};

const chartConfig = {
  roomTemperature: {
    label: "T. Ambiente",
    color: "hsl(var(--chart-1))",
  },
  temperature1: {
    label: "T. Posição 1",
    color: "hsl(var(--chart-2))",
  },
  temperature2: {
    label: "T. Posição 2",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartTemperature({ data }: { data: Temperature[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Temperaturas</CardTitle>
        <CardDescription>
          Variação das temperaturas ao longo do dia.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig}>
          <LineChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              tickLine={false}
              axisLine={false}
              dataKey="dateTime"
              tickFormatter={(date) => format(parseISO(date), "HH:mm")}
              tickMargin={10}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    format(parseISO(value), "HH:mm")
                  }
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="roomTemperature"
              name="T. Ambiente"
              stroke="var(--color-roomTemperature)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="temperature1"
              name="T. Posição 1"
              stroke="var(--color-temperature1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="temperature2"
              name="T. Posição 2"
              stroke="var(--color-temperature2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
