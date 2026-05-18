import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fzueeikcgqlrhrsafhvj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dWVlaWtjZ3Fscmhyc2FmaHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzgwMTUsImV4cCI6MjA5NDcxNDAxNX0._COKnhmTfjJyNr7TsF9BWCwIi5eTLc1sBBJR7022Vmw';

export const supabase = createClient(supabaseUrl, supabaseKey);