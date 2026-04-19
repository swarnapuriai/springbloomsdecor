export default function IntroSection() {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-[80px] bg-gold/50" />
          <span className="text-gold text-2xl">❀</span>
          <div className="h-px flex-1 max-w-[80px] bg-gold/50" />
        </div>

        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
          Welcome to Spring Blooms Decor
        </p>
        <h2
          className="text-maroon text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Where Every Celebration
          <br />
          Becomes a{" "}
          <span className="text-gold italic">Timeless Story</span>
        </h2>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
          Spring Blooms Decor brings the vibrant traditions of Indian weddings
          to life across the United States. With over a decade of experience, we
          specialize in breathtaking mandap setups, lush floral arrangements,
          and immersive event design that seamlessly blends Indian heritage with
          modern elegance.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { number: "500+", label: "Events Decorated" },
            { number: "12+", label: "Years Experience" },
            { number: "50+", label: "Cities Served" },
            { number: "98%", label: "Happy Couples" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-maroon mb-1"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
