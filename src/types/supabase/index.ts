import { Database } from "@/lib/supabase/database.types";

export type Profile = Database["public"]["Tables"]["service_users"]["Row"];
export type Survey = Database["public"]["Tables"]["surveys"]["Row"];
export type Reward = Database["public"]["Tables"]["rewards"]["Row"];
export type Gacha = Database["public"]["Tables"]["gachas"]["Row"];
export type Answer = Database["public"]["Tables"]["answers"]["Row"];
export type Question = Database["public"]["Tables"]["questions"]["Row"];
export type Response = Database["public"]["Tables"]["responses"]["Row"];
export type UserReward = Database["public"]["Tables"]["user_rewards"]["Row"];
