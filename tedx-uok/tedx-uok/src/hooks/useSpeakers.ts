import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Speaker {
  speaker_id: string; // UUID from your DB
  full_name: string;
  title: string;
  talk_title: string;
  photo_url: string;
  bio_short?: string;
  bio_long?: string;
  organization?: string;
  talk_description?: string;
  expertise: string[]; // This is missing in DB, so we defaults to []
  social_links?: {
    // JSONB from DB
    linkedin?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
}

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

        const { data, error: dbError } = await query;

        if (dbError) throw dbError;

        // Map database columns to your app's interface
        const formattedData: Speaker[] = (data || []).map((s: any) => ({
          speaker_id: s.speaker_id, // Matches your DB column name
          full_name: s.full_name,
          title: s.title,
          talk_title: s.talk_title,
          photo_url: s.photo_url,
          bio_short: s.bio_short,
          bio_long: s.bio_long,
          organization: s.organization,
          talk_description: s.talk_description,
          // DB doesn't have 'expertise' yet, so we return empty array to prevent crash
          expertise: [],
          // Safely handle jsonb social_links
          social_links: s.social_links || {},
        }));

        setSpeakers(formattedData);
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

        // Your DB uses 'speaker_id' (UUID), not 'id'
        const { data, error: dbError } = await supabase
          .from("speakers")
          .select("*")
          .eq("speaker_id", id)
          .single();

        if (dbError) throw dbError;

        if (data) {
          const formattedSpeaker: Speaker = {
            speaker_id: data.speaker_id,
            full_name: data.full_name,
            title: data.title,
            talk_title: data.talk_title,
            photo_url: data.photo_url,
            bio_short: data.bio_short,
            bio_long: data.bio_long,
            organization: data.organization,
            talk_description: data.talk_description,
            expertise: [], // Default to empty since column is missing
            social_links: data.social_links || {},
          };
          setSpeaker(formattedSpeaker);
        }
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
