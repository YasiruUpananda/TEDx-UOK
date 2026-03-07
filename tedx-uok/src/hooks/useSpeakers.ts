import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Speaker } from "../types/models";

export const useSpeakers = (limit?: number) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        setError(null);
        let query = supabase.from("speakers").select("*");

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setSpeakers(data || []);
      } catch (err: any) {
        console.error("Error fetching speakers:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, [limit]);

  return { speakers, loading, error };
};

export const useSpeaker = (id: string) => {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("speakers")
          .select("*")
          .eq("speaker_id", id)
          .single();

        if (fetchError) throw fetchError;
        setSpeaker(data);
      } catch (err: any) {
        console.error("Error fetching speaker:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpeaker();
    }
  }, [id]);

  return { speaker, loading, error };
};
