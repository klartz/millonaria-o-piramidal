import { supabase } from "../lib/supabaseClient";

const updatePromptUsage = async (userId) => {
  try {
    const { data: profile, error: selectError } = await supabase
      .from('profiles')
      .select('prompts_used')
      .eq('id', userId)
      .single();

    if (selectError) throw selectError;

    const currentUsed = profile.prompts_used || 0;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ prompts_used: currentUsed + 1 })
      .eq('id', userId)
      .single();

    if (updateError) throw updateError;
  } catch (error) {
    console.error("Error updating prompt usage:", error);
    return null;
  }
};

export default updatePromptUsage;
