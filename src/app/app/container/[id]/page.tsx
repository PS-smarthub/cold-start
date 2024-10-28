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
import { Button } from "@/components/ui/button";
import { updatSetPoint } from "../actions";
import { useForm } from "react-hook-form";
import { SetPointFormData, updateSetPointSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { CheckIcon } from "@radix-ui/react-icons";

export interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const form = useForm<SetPointFormData>({
    resolver: zodResolver(updateSetPointSchema),
  });

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

  const handleSaveSetPoint = async () => {
    const valueFromInput = form.getValues("setPointValue");

    try {
      await updatSetPoint({
        containerId: data.id,
        value: Number(valueFromInput),
      });

      toast({
        description: (
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4" />
            <p>Set point alterado com sucesso!</p>
          </div>
        ),
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          description: "Erro ao alterar o set point",
        });
      }
    }
  };
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
              <div className="flex items-center justify-center w-full">
                <div className="max-w-screen-sm space-y-2">
                  <Input
                    {...form.register("setPointValue")}
                    id="number-input"
                    type="number"
                    defaultValue={data.setPoint as number}
                    step={0.25}
                    className="text-center"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-center font-semibold mb-1">Agendamento</h3>
                <div className="flex items-center space-x-2 p-4 border rounded text-sm">
                  <span className="font-semibold">
                    {data.schedulingContainers.length < 1 && "Não agendado"}
                    {data.schedulingContainers.length >= 1 &&
                      data.schedulingContainers[0].userName1}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleSaveSetPoint}>Salvar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
