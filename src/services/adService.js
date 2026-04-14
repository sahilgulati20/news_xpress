import { supabase } from "../lib/supabase";

/**
 * Fetches active advertisements that are within their valid date range.
 * If start_date or end_date are null, they are considered valid.
 * @returns {Promise<Array>} List of ads
 */
export const getActiveAds = async () => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("priority", { ascending: false, nullsFirst: false }) // Primary: High priority comes first
    .order("created_at", { ascending: false }); // Secondary: Newest first among same priority

  if (error) {
    console.error("Error fetching ads:", error);
    return [];
  }

  return data;
};

// Helpers moved to src/utils/urlHelper.js
