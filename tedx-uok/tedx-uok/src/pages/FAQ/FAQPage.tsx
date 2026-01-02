// src/pages/FAQ/FAQPage.tsx
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "../../lib/supabase";

type FAQItem = {
  faq_item_id: string;
  question: string;
  answer: string;
  display_order: number;
};

type FAQCategory = {
  faq_category_id: string;
  name: string;
  display_order: number;
};

type FAQGroup = {
  category: FAQCategory;
  items: FAQItem[];
  titleParts: { text: string; isRed: boolean }[];
};

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export default function FAQPage() {
  useSEO(seoConfig.faq);
  const [openId, setOpenId] = useState<string | null>(null);
  const [faqGroups, setFaqGroups] = useState<FAQGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQ data from Supabase
  useEffect(() => {
    async function fetchFAQs() {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categories, error: categoriesError } = await supabase
          .from("faq_categories")
          .select("*")
          .order("display_order", { ascending: true });

        if (categoriesError) throw categoriesError;

        // Fetch all FAQ items
        const { data: items, error: itemsError } = await supabase
          .from("faq_items")
          .select("*")
          .order("display_order", { ascending: true });

        if (itemsError) throw itemsError;

        // Group items by category
        const groupedData: FAQGroup[] = categories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.faq_category_id === category.faq_category_id
          );

          const titleParts = splitTitle(category.name);

          return {
            category,
            items: categoryItems,
            titleParts,
          };
        });

        setFaqGroups(groupedData);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Failed to load FAQ data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  // Helper function to split title into white and red parts
  function splitTitle(title: string): { text: string; isRed: boolean }[] {
    const words = title.split(" ");
    if (words.length === 1) {
      return [{ text: title, isRed: true }];
    }

    const lastWord = words[words.length - 1];
    const firstPart = words.slice(0, -1).join(" ") + " ";

    return [
      { text: firstPart, isRed: false },
      { text: lastWord, isRed: true },
    ];
  }

  if (loading) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EB0028] border-r-transparent"></div>
          <p className="mt-4 text-white">Loading FAQs...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#EB0028] text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black w-full">
      <section className="mx-auto max-w-6xl px-6 py-32 space-y-24">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Frequently <span className="text-[#EB0028]">Asked Questions</span>
          </h1>
          <p className="mx-auto max-w-2xl text-white">
            Answers to common questions about attending TEDxUoK.
          </p>
        </div>

        {/* FAQ Groups */}
        {faqGroups.length === 0 ? (
          <div className="text-center text-white/60">
            <p>No FAQ items available at the moment.</p>
          </div>
        ) : (
          faqGroups.map((group) => (
            <div key={group.category.faq_category_id} className="!mb-20">
              <h2 className="text-2xl font-semibold text-center !mb-10">
                {group.titleParts.map((part, idx) => (
                  <span
                    key={idx}
                    className={part.isRed ? "text-[#EB0028]" : "text-white"}
                  >
                    {part.text}
                  </span>
                ))}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {group.items.map((item) => {
                  const id = item.faq_item_id;
                  const isOpen = openId === id;

                  return (
                    <div
                      key={id}
                      className={`rounded-2xl border bg-[#0E0E0E] px-6 transition-all duration-300 ${isOpen
                          ? "border-[#EB0028]/50 pb-6"
                          : "border-[#1F1F1F] pb-0 hover:border-[#EB0028]/30"
                        }`}
                    >
                      {/* Button Section */}
                      <button
                        onClick={() => setOpenId(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="w-full text-left font-medium text-white focus:outline-none py-6 flex items-start justify-between gap-3"
                      >
                        <span className="flex-1">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#EB0028] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Animated Content Section using CSS Grid Trick */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          {/* Note: We used pt-2 instead of mt-4 here.
                             Using margins on the animating element causes jumps.
                             Padding inside the overflow container animates smoothly.
                          */}
                          <p className="pt-2 text-gray-300 leading-relaxed text-left border-t border-[#1F1F1F]/50">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}