import { createClient } from '@supabase/supabase-js'

// TARUH URL DAN KEY ASLI DI SINI (Pakai tanda kutip!)
const supabaseUrl = 'https://xxxxxxxxxxxx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx...'

export const supabase = createClient(supabaseUrl, supabaseKey)