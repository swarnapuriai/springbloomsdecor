import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/supabase/types";

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "1",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 6–12 months in advance for wedding packages. For smaller events, 2–3 months notice is usually sufficient.",
    category: "booking",
    display_order: 1,
    created_at: "",
  },
  {
    id: "2",
    question: "Do you travel outside of Texas?",
    answer:
      "Yes! We travel throughout the United States. Travel and accommodation fees apply for events outside a 100-mile radius of DFW.",
    category: "booking",
    display_order: 2,
    created_at: "",
  },
  {
    id: "3",
    question: "Can we customize our package?",
    answer:
      "Absolutely! All packages are fully customizable. We encourage a consultation to understand your vision and create a bespoke proposal.",
    category: "services",
    display_order: 3,
    created_at: "",
  },
  {
    id: "4",
    question: "What is your payment policy?",
    answer:
      "We require a 30% deposit to secure your date, with 50% due 60 days before the event and the remaining balance 7 days before.",
    category: "payment",
    display_order: 4,
    created_at: "",
  },
  {
    id: "5",
    question: "What flowers do you typically use?",
    answer:
      "We specialize in traditional Indian flowers including marigolds, roses, jasmine, and tuberose, combined with premium blooms like orchids and peonies.",
    category: "services",
    display_order: 5,
    created_at: "",
  },
];

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const topFaqs = faqs.length > 0 ? faqs.slice(0, 5) : DEFAULT_FAQS;

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            Common Questions
          </p>
          <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
          <p className="section-subheading">
            Everything you need to know about working with Spring Blooms Decor.
          </p>
        </div>

        <Accordion className="space-y-3">
          {topFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-gold/20 rounded-xl px-5 bg-white shadow-sm"
            >
              <AccordionTrigger
                className="text-maroon font-semibold text-left hover:no-underline hover:text-maroon-light py-5"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-maroon font-semibold hover:text-maroon-light transition-colors"
          >
            View all FAQs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
