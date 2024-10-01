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

export default function Page() {
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
                  <CardTitle className="text-sm font-normal">
                    Temperatura Ambiente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">10 C°</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-normal">
                    Posição 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">13 C°</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-normal">
                    Posição 2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">12 C°</p>
                </CardContent>
              </Card>
            </div>
            <ChartTemperature />
          </div>

          <Card className="h-fit">
            <CardHeader className="p-3">
              <CardTitle className="text-lg">Painel de Controle</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Posição 1
                  </label>
                  <Input
                    type="text"
                    value="12 C°"
                    className="h-8 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Posição 2
                  </label>
                  <Input
                    type="text"
                    value="12 C°"
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
