# Supabase Client Usage (React + TypeScript)

## Install

- npm: `npm install @supabase/supabase-js`
- Dev types (if missing): `npm install -D @types/node`

## Env vars (.env.local)

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
VITE_SUPABASE_BUCKET_SPEAKER_PHOTOS=speaker-photos
VITE_SUPABASE_BUCKET_TEAM_PHOTOS=team-photos
VITE_SUPABASE_BUCKET_PARTNER_LOGOS=partner-logos
VITE_SUPABASE_BUCKET_VOLUNTEER_CV=volunteer-cv
```

Restart `npm run dev` after edits.

## Client setup

- File: [src/api/supabaseClient.ts](src/api/supabaseClient.ts)

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase env vars are missing");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

## Database types

- File: [src/types/database.ts](src/types/database.ts)
- Contains `Database`, `TableRow`, `TableInsert`, `TableUpdate` helpers for all tables (events, venues, speakers, partners, team_members, agenda_items, registrations, volunteer_applications, blog_posts, faq_categories, faq_items, settings).

## Common patterns

### Fetch data

```ts
import { supabase } from "@/api/supabaseClient";
import type { TableRow } from "@/types/database";

export async function getActiveEvents(): Promise<TableRow<"events">[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("date", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
```

### Insert data (registration)

```ts
import { supabase } from "@/api/supabaseClient";
import type { TableInsert } from "@/types/database";

export async function submitRegistration(
  payload: TableInsert<"registrations">
) {
  const { data, error } = await supabase
    .from("registrations")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}
```

### Upload to Storage

```ts
import { supabase } from "@/api/supabaseClient";

export async function uploadSpeakerPhoto(file: File, path: string) {
  const bucket = import.meta.env.VITE_SUPABASE_BUCKET_SPEAKER_PHOTOS as string;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });
  if (error) throw error;
  return data; // includes path and bucket
}
```

### Real-time subscription (optional)

```ts
import { supabase } from "@/api/supabaseClient";
import type { TableRow } from "@/types/database";

export function subscribeToRegistrations(
  onInsert: (row: TableRow<"registrations">) => void
) {
  const channel = supabase
    .channel("registrations-feed")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "registrations" },
      (payload) => onInsert(payload.new as TableRow<"registrations">)
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}
```

## Error handling patterns

- Always check `{ error }` and throw or map to user-friendly messages.
- Use `try/catch` at the call site to present UI feedback.
- Prefer `select().single()` when one row is expected; handle `status` codes if needed.
- For forms, you can return `{ ok: boolean, message?: string }` instead of throwing for expected validation cases.

## Hooks (examples)

### Generic query hook

```ts
import { useEffect, useState } from "react";

export function useSupabaseQuery<T>(queryFactory: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    queryFactory()
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err as Error))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [queryFactory]);

  return { data, loading, error };
}
```

### Specific hooks

```ts
import { useSupabaseQuery } from "./useSupabaseQuery";
import { supabase } from "@/api/supabaseClient";

export const useEvents = () =>
  useSupabaseQuery(async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("date", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });

export const useSpeakers = () =>
  useSupabaseQuery(async () => {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("full_name", { ascending: true });
    if (error) throw error;
    return data ?? [];
  });
```

## Usage tips

- Keep a single exported `supabase` instance.
- Use typed helpers: `TableRow<'events'>`, `TableInsert<'registrations'>`.
- Namespace storage paths, e.g., `speakers/{speaker_id}.jpg`.
- Ensure RLS policies allow the above operations for anon/public clients.
- For SSR or edge, create a service-role client server-side only (never expose the key in Vite envs).
