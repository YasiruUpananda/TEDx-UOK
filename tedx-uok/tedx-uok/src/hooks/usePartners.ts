import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  tier: "Title" | "Gold" | "Silver" | "Bronze" | "In-kind";
  website_url?: string;
}

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("partners")
          .select("*")
          .eq("is_active", true);

        if (error) throw error;
        setPartners(data || []);
      } catch (err: any) {
        console.error("Error fetching partners:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return { partners, loading };
};
