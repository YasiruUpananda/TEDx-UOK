import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

export interface SettingsData {
  settings_id: string;
  current_event_id: string;
  primary_cta_label: string;
  primary_cta_url: string;
  contact_email: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .limit(1)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            console.warn("No settings row found in database.");
            setSettings(null);
          } else {
            throw error;
          }
        } else {
          setSettings(data);
        }
      } catch (err: any) {
        console.error("Error fetching settings:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};
