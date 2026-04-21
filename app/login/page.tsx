import { SetupRequired } from '@/components/SupabaseGuard';
import { createClient } from '@/lib/supabase/server';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  const supabase = await createClient();
  if (!supabase) return <SetupRequired />;

  return (
    <LoginForm 
      supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} 
      supabaseKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''} 
    />
  );
}
