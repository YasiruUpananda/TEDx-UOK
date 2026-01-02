export interface Partner {
  id: string;
  name: string;
  tier: string;
  logo: string;
}

interface Props {
  partners: Partner[];
}

export function Partners({ partners }: Props) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Our Partners
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powered by Visionaries
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We're grateful to our partners who share our vision of spreading
            ideas worth sharing.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors"
            >
              {/* Logo Area */}
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3 overflow-hidden group-hover:bg-primary/10 transition-colors">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-fit grayscale group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground text-center">
                {partner.name}
              </p>
              <p className="text-xs text-muted-foreground">{partner.tier}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
