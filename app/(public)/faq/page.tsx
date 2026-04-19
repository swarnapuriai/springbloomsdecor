import { createClient } from "@/lib/supabase/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQ } from "@/lib/supabase/types";

export const revalidate = 3600;

const DEFAULT_FAQS: FAQ[] = [
  { id: "1", question: "How far in advance should I book?", answer: "We recommend booking at least 6–12 months in advance for wedding packages, especially for peak season (October–April). For smaller events, 2–3 months notice is usually sufficient.", category: "booking", display_order: 1, created_at: "" },
  { id: "2", question: "Do you travel outside of Texas?", answer: "Yes! While we are based in the Dallas–Fort Worth area, we travel throughout the United States. Travel and accommodation fees apply for events outside a 100-mile radius.", category: "booking", display_order: 2, created_at: "" },
  { id: "3", question: "Can we customize our package?", answer: "Absolutely! All our packages are fully customizable. We encourage a consultation to understand your vision, cultural preferences, and budget so we can create a bespoke proposal just for you.", category: "services", display_order: 3, created_at: "" },
  { id: "4", question: "What flowers do you typically use?", answer: "We specialize in traditional Indian flowers including marigolds, roses, jasmine, and tuberose, combined with premium blooms like orchids, peonies, and ranunculus.", category: "services", display_order: 4, created_at: "" },
  { id: "5", question: "Do you provide a day-of coordinator?", answer: "Our Royal Heritage package includes a day-of coordinator. For other packages, day-of coordination can be added for an additional fee.", category: "services", display_order: 5, created_at: "" },
  { id: "6", question: "What is your payment policy?", answer: "We require a 30% deposit to secure your date, with 50% due 60 days before the event and the remaining balance 7 days before the event.", category: "payment", display_order: 6, created_at: "" },
  { id: "7", question: "What happens if I need to cancel?", answer: "Cancellations made more than 90 days before the event receive a full refund minus the deposit. Cancellations within 60–90 days forfeit 50% of payments made. Cancellations within 60 days are non-refundable.", category: "payment", display_order: 7, created_at: "" },
  { id: "8", question: "Do you work with venue coordinators?", answer: "Yes, we work closely with venue staff and other vendors to ensure seamless setup. We have established relationships with many venues in the DFW area.", category: "logistics", display_order: 8, created_at: "" },
];

const CATEGORY_LABELS: Record<string, string> = {
  booking: "Booking & Scheduling",
  services: "Services & Florals",
  payment: "Payments & Policies",
  logistics: "Logistics & Vendors",
  general: "General",
};

export default async function FAQPage() {
  let faqs: FAQ[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("faqs").select("*").order("display_order");
    if (data && data.length > 0) faqs = data;
  } catch {}

  const items = faqs.length > 0 ? faqs : DEFAULT_FAQS;

  // Group by category
  const grouped = items.reduce((acc, faq) => {
    const cat = faq.category || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Help Center</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Frequently Asked Questions
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          Everything you need to know about working with Spring Blooms Decor.
        </p>
      </div>

      <div className="py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped).map(([category, categoryFaqs]) => (
            <div key={category} className="mb-12">
              <h2 className="text-maroon text-xl font-bold mb-6 pb-2 border-b border-gold/30" style={{ fontFamily: "var(--font-playfair), serif" }}>
                {CATEGORY_LABELS[category] || category}
              </h2>
              <Accordion className="space-y-3">
                {categoryFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border border-gold/20 rounded-xl px-5 bg-white shadow-sm">
                    <AccordionTrigger className="text-maroon font-semibold text-left hover:no-underline hover:text-maroon-light py-5" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Still have questions */}
          <div className="bg-maroon rounded-2xl p-8 text-center mt-8">
            <h3 className="text-ivory text-xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>Still Have Questions?</h3>
            <p className="text-ivory/70 mb-5">Our team is happy to help with any questions not answered here.</p>
            <a href="/contact" className="inline-block bg-gold text-maroon-dark font-semibold px-6 py-2.5 rounded hover:bg-gold-light transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
