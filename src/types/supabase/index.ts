import { Database } from "@/lib/supabase/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Survey = Database["public"]["Tables"]["surveys"]["Row"];
export type Reward = Database["public"]["Tables"]["rewards"]["Row"];
export type Gacha = Database["public"]["Tables"]["gachas"]["Row"];
export type Participation = Database["public"]["Tables"]["profiles_surveys"]["Row"];
