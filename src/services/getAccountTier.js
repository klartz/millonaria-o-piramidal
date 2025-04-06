import { supabase } from "../lib/supabaseClient";

const getAccountTier = async (userId) => {
  try {
    const { data } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', userId)
    .single();

    return data.tier;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default getAccountTier;