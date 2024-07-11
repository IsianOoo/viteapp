import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types";

const supabase = createClient<Database>("https://jrjsqqstiwofcknvmxhq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyanNxcXN0aXdvZmNrbnZteGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzMxODQsImV4cCI6MjAzNjIwOTE4NH0.wwyVVtfDBZKywROYkq1dCFHYUNM3h3Y3IQ6COnihXaQ");

export default supabase