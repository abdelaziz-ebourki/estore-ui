import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key } from "lucide-react";

export function PersonalInfo() {
  return (
    <div className="space-y-8">
      <Card className="rounded-[2.5rem] border-muted-foreground/10 shadow-sm overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" /> Paramètres du compte
          </CardTitle>
          <CardDescription>Gérez vos informations personnelles.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Prénom
              </Label>
              <Input defaultValue="Jean" className="rounded-2xl h-12 bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Nom
              </Label>
              <Input defaultValue="Dupont" className="rounded-2xl h-12 bg-muted/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Adresse Email
              </Label>
              <Input defaultValue="jean.dupont@exemple.fr" className="rounded-2xl h-12 bg-muted/30" />
            </div>
          </div>
          <Button className="rounded-2xl h-12 px-8 font-bold shadow-lg shadow-primary/20">
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] border-muted-foreground/10 shadow-sm overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Key className="w-6 h-6 text-primary" /> Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Mot de passe actuel
              </Label>
              <Input type="password" placeholder="••••••••" className="rounded-2xl h-12 bg-muted/30" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Nouveau mot de passe
                </Label>
                <Input type="password" placeholder="••••••••" className="rounded-2xl h-12 bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Confirmer le mot de passe
                </Label>
                <Input type="password" placeholder="••••••••" className="rounded-2xl h-12 bg-muted/30" />
              </div>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 font-bold">
              Mettre à jour le mot de passe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
