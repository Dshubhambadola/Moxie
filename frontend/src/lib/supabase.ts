
import { createBrowserClient } from '@supabase/ssr'

// TODO: Revert to process.env after testing
const SUPABASE_URL = "https://cpfmrgmmwhpbgjrwhpvs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZm1yZ21td2hwYmdqcndocHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjgwNzgsImV4cCI6MjA4MzYwNDA3OH0.0MPBj01FH1jHlFYwrbI8XzTBz2ZqcU_eOss8D0ztfTs";

export const createClient = () => {
    return createBrowserClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    )
}
