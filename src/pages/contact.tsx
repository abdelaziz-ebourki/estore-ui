import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message envoyé ! Notre équipe vous répondra sous 24h.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Contactez-nous</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Une question sur un produit ? Un problème avec votre commande ? Notre équipe est là pour
            vous aider.
          </p>

          <div className="mt-12 space-y-8">
            <ContactInfo
              icon={Phone}
              title="Téléphone"
              desc="+33 (0) 1 23 45 67 89"
              sub="Lun-Sam, 9h-18h"
            />
            <ContactInfo
              icon={Mail}
              title="Email"
              desc="support@techstore.com"
              sub="Réponse sous 24h"
            />
            <ContactInfo
              icon={MapPin}
              title="Boutique"
              desc="123 Avenue de la Tech, 75001 Paris"
              sub="Visitez notre showroom"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-[var(--shadow-elegant)]">
          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                  Prénom
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                  Nom
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
              ></textarea>
            </div>

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground hover:bg-primary-glow transition disabled:opacity-50"
            >
              {loading ? (
                "Envoi..."
              ) : (
                <>
                  <Send className="h-4 w-4" /> Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, title, desc, sub }: any) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <p className="mt-1 font-medium">{desc}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}
