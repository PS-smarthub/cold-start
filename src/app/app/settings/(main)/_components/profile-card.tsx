import { Session } from "next-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
  defaultValues: Session["user"] | undefined;
};

export function ProfileCard({ defaultValues }: ProfileFormProps) {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Perfil</CardTitle>
        <CardDescription>
          Gerencie as configurações para o seu perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <Label>Nome</Label>
              <Input readOnly value={defaultValues?.name as string} />
            </div>
            <div className="space-y-1">
              <Label>E-mail</Label>
              <Input readOnly value={defaultValues?.email as string} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
