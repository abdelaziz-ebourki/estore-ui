import { Link } from "react-router-dom";
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export function ProfilePage() {
  const user = {
    name: "Alex Smith",
    email: "alex@example.com",
    orders: [
      { id: "#4582", date: "12 Mai 2024", total: "1299 €", status: "Livré" },
      { id: "#4491", date: "02 Avr 2024", total: "279 €", status: "Livré" },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Mon compte</h1>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-1">
          <NavItem icon={User} label="Profil" active />
          <NavItem icon={Package} label="Commandes" />
          <NavItem icon={MapPin} label="Adresses" />
          <NavItem icon={Settings} label="Paramètres" />
          <button
            onClick={() => toast.info("Déconnexion...")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display font-semibold mb-6">Informations personnelles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-muted-foreground uppercase font-semibold">Nom</label>
                <div className="mt-1 font-medium">{user.name}</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase font-semibold">
                  Email
                </label>
                <div className="mt-1 font-medium">{user.email}</div>
              </div>
            </div>
            <button className="mt-8 text-sm font-semibold text-primary hover:underline">
              Modifier mes informations
            </button>
          </section>

          <section className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-semibold">Dernières commandes</h2>
              <Link to="/profile" className="text-xs font-semibold text-primary hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-border">
              {user.orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 flex items-center justify-between hover:bg-accent/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-surface grid place-items-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Commande {o.id}</div>
                      <div className="text-xs text-muted-foreground">{o.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <div className="font-semibold text-sm">{o.total}</div>
                      <div className="text-[10px] text-success font-bold uppercase tracking-wider">
                        {o.status}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: any) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}
