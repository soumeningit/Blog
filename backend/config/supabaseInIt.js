const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_DB_URL,
    process.env.SUPABASE_PUBLIC_ANON_KEY
);

const supabaseFileUpload = createClient(
    process.env.SUPABASE_DB_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = { supabase, supabaseFileUpload };