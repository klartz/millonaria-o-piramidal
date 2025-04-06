import { supabase } from '../lib/supabaseClient';

const updateAccountTier = async (userId, newTier) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ tier: newTier })
      .eq('id', userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating account tier:', error.message);
    return null;
  }
};

export default updateAccountTier;