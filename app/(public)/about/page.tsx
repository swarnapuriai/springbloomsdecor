import Image from "next/image";
import Link from "next/link";
import { Heart, Award, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Our Story</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          About Spring Blooms Decor
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          A passion for beauty, tradition, and creating unforgettable celebrations.
        </p>
      </div>

      {/* Story section */}
      <div className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Who We Are</p>
              <h2 className="text-maroon text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Where Tradition Meets Modern Elegance
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Spring Blooms Decor was founded with a simple mission: to bring the breathtaking beauty of
                  Indian wedding traditions to life across the United States, while honoring the unique stories
                  of every couple we work with.
                </p>
                <p>
                  Our team of passionate designers, florists, and event specialists brings decades of combined
                  experience and a deep reverence for Indian culture, customs, and aesthetics. We understand
                  that your wedding is not just an event — it&apos;s a once-in-a-lifetime celebration of love,
                  family, and heritage.
                </p>
                <p>
                  From the grand mandap to the smallest floral detail, we pour our heart into every element
                  we create. We source the finest flowers, fabrics, and materials, and we work closely with
                  you to ensure every detail reflects your vision and your family&apos;s traditions.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                alt="Spring Blooms Decor team at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-ivory">
                <p className="text-gold text-sm uppercase tracking-widest">Est. 2012</p>
                <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  12+ Years of Excellence
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Heart, title: "Passion", desc: "Every event is crafted with genuine love for the art of decoration and the couples we serve." },
              { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in design, materials, and service delivery." },
              { icon: Users, title: "Family-First", desc: "We treat every client like family, building relationships that last beyond the wedding day." },
              { icon: MapPin, title: "Nationwide", desc: "Based in DFW but proudly serving Indian weddings across the entire United States." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-ivory-dark rounded-xl p-6 text-center border border-gold/10">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-maroon" />
                </div>
                <h3 className="text-maroon font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-maroon rounded-2xl p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Events Decorated" },
                { number: "12+", label: "Years Experience" },
                { number: "50+", label: "Cities Served" },
                { number: "98%", label: "5-Star Reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-gold text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>{stat.number}</div>
                  <div className="text-ivory/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-maroon text-ivory font-semibold px-8 py-3 rounded hover:bg-maroon-light transition-colors">
              Work With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
