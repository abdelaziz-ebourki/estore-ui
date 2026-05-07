import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"card" | "cod">("card");
  const [done, setDone] = useState(false);
  const shipping = total > 50 || total === 0 ? 0 : 4.99;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 font-display text-3xl font-bold">Commande confirmée !</h1>
        <p className="mt-3 text-muted-foreground">
          Merci pour votre achat. Vous recevrez un email de confirmation.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Votre panier est vide</h1>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Commande passée !");
    clear();
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Finaliser la commande</h1>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <Card icon={Truck} title="Livraison">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom complet" required />
              <Field label="Téléphone" type="tel" required />
              <div className="sm:col-span-2">
                <Field label="Adresse" required />
              </div>
              <Field label="Ville" required />
              <Field label="Code postal" required />
            </div>
          </Card>

          <Card icon={CreditCard} title="Paiement">
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <PayOption
                active={pay === "card"}
                onClick={() => setPay("card")}
                title="Carte bancaire"
                desc="Visa, Mastercard"
              />
              <PayOption
                active={pay === "cod"}
                onClick={() => setPay("cod")}
                title="À la livraison"
                desc="Espèces / CB"
              />
            </div>
            {pay === "card" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Numéro de carte" placeholder="1234 5678 9012 3456" required />
                </div>
                <Field label="Expiration" placeholder="MM/AA" required />
                <Field label="CVC" placeholder="123" required />
              </div>
            )}
          </Card>
        </div>

        <aside>
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display font-semibold mb-4">Votre commande</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map((i) => (
                <div key={i.product.id} className="flex gap-3 text-sm">
                  <img
                    src={i.product.image}
                    alt=""
                    className="h-12 w-12 rounded-lg object-cover bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-1">{i.product.name}</div>
                    <div className="text-xs text-muted-foreground">x{i.qty}</div>
                  </div>
                  <div className="font-semibold">{(i.product.price * i.qty).toFixed(2)} €</div>
                </div>
              ))}
            </div>
            <div className="my-4 border-t border-border" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between font-display text-lg font-bold">
              <span>Total</span>
              <span>{(total + shipping).toFixed(2)} €</span>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition"
            >
              Confirmer la commande
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Card({ icon: Icon, title, children }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-display font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </label>
  );
}

function PayOption({ active, onClick, title, desc }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition ${
        active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
      }`}
    >
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
    </button>
  );
}
