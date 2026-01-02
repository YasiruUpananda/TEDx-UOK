import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface AgendaItem {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  type: string;
  speaker_id?: number;
}

export const useAgenda = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("agenda_items")
          .select("*")
          .order("start_time", { ascending: true });

        if (error) throw error;
        setAgenda(data || []);
      } catch (err: any) {
        console.error("Error fetching agenda:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  return { agenda, loading };
};
