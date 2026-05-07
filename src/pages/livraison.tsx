import { Link } from "react-router-dom";
import { Truck, Clock, Globe, ShieldCheck } from "lucide-react";

export function LivraisonPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Livraison & Expédition</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tout ce qu'il faut savoir sur l'acheminement de vos commandes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-16">
        <Feature
          icon={Clock}
          title="Délais rapides"
          desc="Toute commande passée avant 14h est expédiée le jour même. Livraison sous 24-48h pour la France métropolitaine."
        />
        <Feature
          icon={Truck}
          title="Livraison Gratuite"
          desc="La livraison standard est offerte dès 50€ d'achat. En dessous, un forfait de 4.99€ s'applique."
        />
        <Feature
          icon={Globe}
          title="International"
          desc="Nous livrons dans toute l'Europe et vers les DOM-TOM. Les délais varient de 3 à 7 jours ouvrés."
        />
        <Feature
          icon={ShieldCheck}
          title="Suivi Colis"
          desc="Dès l'expédition, vous recevez un numéro de suivi par email pour localiser votre colis en temps réel."
        />
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
        <h2 className="font-display text-2xl font-bold mb-6">Nos transporteurs partenaires</h2>
        <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition duration-500">
          {/* Placeholder for logos */}
          <div className="text-xl font-bold italic">DHL</div>
          <div className="text-xl font-bold italic">FedEx</div>
          <div className="text-xl font-bold italic">Chronopost</div>
          <div className="text-xl font-bold italic">UPS</div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
          Nous sélectionnons rigoureusement nos partenaires logistiques pour vous garantir une
          livraison sûre et rapide. En cas d'absence, votre colis sera déposé dans le point relais
          le plus proche ou fera l'objet d'une nouvelle présentation.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center font-semibold text-primary hover:underline"
        >
          Retourner à la boutique →
        </Link>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
