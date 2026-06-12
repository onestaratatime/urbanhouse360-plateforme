import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'Present ✓' : 'Missing ✗');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('\n=== Testing connection to acquereurs_publics ===');

  const { data, error } = await supabase
    .from('acquereurs_publics')
    .select('*');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Success! Found ${data?.length || 0} acquéreurs`);

  if (data && data.length > 0) {
    console.log('\nFirst acquéreur:');
    console.log('  - Quartiers:', data[0].quartiers);
    console.log('  - Timing:', data[0].timing);
    console.log('  - Budget max:', data[0].budget_max);

    const timingCounts = {
      court_terme: 0,
      moyen_terme: 0,
      long_terme: 0
    };

    data.forEach((a: any) => {
      if (a.timing in timingCounts) {
        timingCounts[a.timing as keyof typeof timingCounts]++;
      }
    });

    console.log('\nDistribution by timing:');
    console.log('  - Immédiat (court_terme):', timingCounts.court_terme);
    console.log('  - 6-12 mois (moyen_terme):', timingCounts.moyen_terme);
    console.log('  - 1 an+ (long_terme):', timingCounts.long_terme);
  }
}

testConnection().catch(console.error);
