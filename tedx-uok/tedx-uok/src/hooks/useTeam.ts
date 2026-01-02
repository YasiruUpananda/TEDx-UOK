import { useState, useEffect } from 'react';
import type { TeamMember } from '../types/models';
import { supabase } from '../lib/supabaseClient';

export function useTeam() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTeam() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('team_members')
                    .select('*')
                    .order('full_name', { ascending: true });

                if (error) {
                    throw error;
                }

                if (data) {
                    setMembers(data as TeamMember[]);
                }
            } catch (err) {
                console.error('Error fetching team:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch team');
            } finally {
                setLoading(false);
            }
        }

        fetchTeam();
    }, []);

    return { members, loading, error };
}
