import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface EventData {
  id: string;
  name: string;
  theme: string;
  description: string; // Needed for your new Theme section
  date: string;
  venue_id: string;
  venues?: {
    name: string;
    address: string;
    city: string;
  };
}

export const useEvents = () => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventViaSettings = async () => {
      try {
        setLoading(true);

        // 1. Get the Global Settings to find out WHICH event is current
        const { data: settingsData, error: settingsError } = await supabase
          .from("settings")
          .select("current_event_id")
          .single();

        if (settingsError) throw settingsError;
        if (!settingsData?.current_event_id)
          throw new Error("No current event set in Settings table");

        // 2. Fetch THAT specific event (and its venue)
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*, venues(*)")
          .eq("event_id", settingsData.current_event_id)
          .single();

        if (eventError) throw eventError;

        setEvent(eventData);
      } catch (err: any) {
        console.error("Error fetching event:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventViaSettings();
  }, []);

  return { event, loading, error };
};
