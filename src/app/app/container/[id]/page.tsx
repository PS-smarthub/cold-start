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
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../(main)/types";

export interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { data, isLoading, isError, error } = useQuery<Container>({
    queryKey: ["temperatures", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/container/${params.id}`);

      const data = await response.json();

      return data;
    },
    refetchInterval: 60000,
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

  if (!data) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        Nenhum dado disponível
      </div>
    );
  }
  console.log(data);
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <div className="flex justify-between items-center">
          <div>
            <DashboardPageHeaderTitle>
              Container {data.device.split("_")[1]}
            </DashboardPageHeaderTitle>
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
                  <p className="text-3xl font-medium">
                    {
                      data.temperatures[data.temperatures.length - 1]
                        .roomTemperature
                    }{" "}
                    C°
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Posição 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-medium">
                    {
                      data.temperatures[data.temperatures.length - 1]
                        .temperature1
                    }{" "}
                    C°
                  </p>
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
                    {
                      data.temperatures[data.temperatures.length - 1]
                        .temperature2
                    }{" "}
                    C°
                  </p>
                </CardContent>
              </Card>
            </div>
            <ChartTemperature data={data.temperatures} />
          </div>

          <Card className="h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Painel de Controle</CardTitle>
            </CardHeader>
            <CardContent className="px-6 space-y-4">
              <div className="grid grid-cols-1">
                <div className="flex items-center flex-col">
                  <label className="block font-semibold mb-1 text-center">
                    Set point
                  </label>
                  <Input
                    type="text"
                    value={`${data.temperatures[0].roomTemperature} C°`}
                    className="h-16 text-sm w-32"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <h3 className="text-center font-semibold mb-1">Agendamento</h3>
                <div className="flex items-center space-x-2 p-4 border rounded text-sm">
                  <span className="font-semibold">
                    {data.schedulingContainers.length < 1 && "Não agendado"}
                    {data.schedulingContainers.length > 1 && data.schedulingContainers[0].userName1 }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
