import { supabase } from "../lib/supabaseClient";

const getPromptUsage = async (userId) => {
  try {
    const res = await supabase
      .from('profiles')
      .select('prompts_used')
      .eq('id', userId)
      .single();

    return res.data.prompts_used;
  } catch (error) {
    console.error("Error fetching prompt usage:", error);
    return null;
  }
}

export default getPromptUsage;