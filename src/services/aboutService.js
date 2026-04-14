import { supabase } from '../lib/supabase';

/**
 * Fetches team members for the About Us section
 * @returns {Promise<Array>} List of team members
 */
export const getTeamMembers = async () => {
    const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching team members:', error);
        return [];
    }

    return data;
};
