"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { ChartTemperature } from "../_components/chart-temperature";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface TemperatureData {
  id: number;
  date_time: string;
  room_temperature: number;
  temperature_1: number;
  temperature_2: number;
  container_id: number;
}

const fetchTemperatures = async (): Promise<TemperatureData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return [
    {
      id: 0,
      date_time: "2024-10-02T00:00:00",
      room_temperature: 20,
      temperature_1: 22,
      temperature_2: 21,
      container_id: 0,
    },
    {
      id: 1,
      date_time: "2024-10-02T04:00:00",
      room_temperature: 19,
      temperature_1: 23,
      temperature_2: 22,
      container_id: 0,
    },
    {
      id: 2,
      date_time: "2024-10-02T08:00:00",
      room_temperature: 21,
      temperature_1: 24,
      temperature_2: 23,
      container_id: 0,
    },
    {
      id: 3,
      date_time: "2024-10-02T12:00:00",
      room_temperature: 23,
      temperature_1: 25,
      temperature_2: 24,
      container_id: 0,
    },
    {
      id: 4,
      date_time: "2024-10-02T16:00:00",
      room_temperature: 24,
      temperature_1: 26,
      temperature_2: 25,
      container_id: 0,
    },
    {
      id: 5,
      date_time: "2024-10-02T20:00:00",
      room_temperature: 22,
      temperature_1: 24,
      temperature_2: 23,
      container_id: 0,
    },
  ];
};

export default function Page() {
  const { data, isLoading, isError, error } = useQuery<
    TemperatureData[],
    Error
  >({
    queryKey: ["temperatures"],
    queryFn: fetchTemperatures,
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        Carregando dados...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        Erro ao carregar dados: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <div className="flex justify-between items-center">
          <div>
            <DashboardPageHeaderTitle>Container 1</DashboardPageHeaderTitle>
            <p className="text-muted-foreground text-sm">
              Visualize as informações específicas de um container
            </p>
          </div>
        </div>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Temperatura Ambiente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-medium">{data[0].room_temperature} C°</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Posição 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-medium">{data[0].temperature_1} C°</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Posição 2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-medium">
                    {data[0].temperature_2} C°
                  </p>
                </CardContent>
              </Card>
            </div>
            <ChartTemperature data={data} />
          </div>

          <Card className="h-fit">
            <CardHeader className="p-3">
              <CardTitle className="text-lg">Painel de Controle</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-4">
              <div className="grid grid-cols-1">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Posição 1
                  </label>
                  <Input
                    type="text"
                    value={`${data[0].temperature_1} C°`}
                    className="h-8 text-sm"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Agendamento</h3>
                <div className="flex items-center space-x-2 p-1 border rounded text-sm">
                  <User className="h-4 w-4" />
                  <span>Diego Lopes</span>
                </div>
              </div>
              <div className="h-32 border rounded flex items-center justify-center">
                <p className="text-lg text-gray-500">GRÁFICO</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}