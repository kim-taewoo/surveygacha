export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer_id: number;
          answer_value: string;
          created_at: string;
          question_id: number;
          response_id: number;
          updated_at: string | null;
        };
        Insert: {
          answer_id?: number;
          answer_value: string;
          created_at?: string;
          question_id: number;
          response_id: number;
          updated_at?: string | null;
        };
        Update: {
          answer_id?: number;
          answer_value?: string;
          created_at?: string;
          question_id?: number;
          response_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["question_id"];
          },
          {
            foreignKeyName: "answers_response_id_fkey";
            columns: ["response_id"];
            isOneToOne: false;
            referencedRelation: "responses";
            referencedColumns: ["response_id"];
          },
        ];
      };
      gacha_rewards: {
        Row: {
          created_at: string | null;
          gacha_id: number | null;
          gacha_reward_id: number;
          is_active: boolean | null;
          is_default: boolean | null;
          probability: number | null;
          reward_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          gacha_id?: number | null;
          gacha_reward_id?: never;
          is_active?: boolean | null;
          is_default?: boolean | null;
          probability?: number | null;
          reward_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          gacha_id?: number | null;
          gacha_reward_id?: never;
          is_active?: boolean | null;
          is_default?: boolean | null;
          probability?: number | null;
          reward_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "gacha_rewards_gacha_id_fkey";
            columns: ["gacha_id"];
            isOneToOne: false;
            referencedRelation: "gachas";
            referencedColumns: ["gacha_id"];
          },
          {
            foreignKeyName: "gacha_rewards_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["reward_id"];
          },
        ];
      };
      gachas: {
        Row: {
          created_at: string;
          description: string | null;
          expires_at: string | null;
          gacha_id: number;
          image_url: string | null;
          name: string;
          pull_count: number | null;
          pull_limit: number | null;
          status: string;
          survey_id: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          expires_at?: string | null;
          gacha_id?: number;
          image_url?: string | null;
          name: string;
          pull_count?: number | null;
          pull_limit?: number | null;
          status: string;
          survey_id?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          expires_at?: string | null;
          gacha_id?: number;
          image_url?: string | null;
          name?: string;
          pull_count?: number | null;
          pull_limit?: number | null;
          status?: string;
          survey_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "gachas_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
        ];
      };
      questions: {
        Row: {
          created_at: string;
          display_order: number | null;
          options: Json | null;
          question_id: number;
          question_text: string;
          question_type: string;
          required: boolean;
          survey_id: number;
        };
        Insert: {
          created_at?: string;
          display_order?: number | null;
          options?: Json | null;
          question_id?: number;
          question_text: string;
          question_type: string;
          required?: boolean;
          survey_id: number;
        };
        Update: {
          created_at?: string;
          display_order?: number | null;
          options?: Json | null;
          question_id?: number;
          question_text?: string;
          question_type?: string;
          required?: boolean;
          survey_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "questions_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
        ];
      };
      responses: {
        Row: {
          ended_at: string | null;
          ip_address: string | null;
          metadata: Json | null;
          response_id: number;
          started_at: string;
          status: string;
          survey_id: number;
          user_agent: string | null;
          user_id: string;
        };
        Insert: {
          ended_at?: string | null;
          ip_address?: string | null;
          metadata?: Json | null;
          response_id?: number;
          started_at?: string;
          status: string;
          survey_id: number;
          user_agent?: string | null;
          user_id: string;
        };
        Update: {
          ended_at?: string | null;
          ip_address?: string | null;
          metadata?: Json | null;
          response_id?: number;
          started_at?: string;
          status?: string;
          survey_id?: number;
          user_agent?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "responses_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
          {
            foreignKeyName: "responses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "service_users";
            referencedColumns: ["id"];
          },
        ];
      };
      rewards: {
        Row: {
          created_at: string | null;
          description: string | null;
          expires_at: string | null;
          image_url: string | null;
          is_claimed: boolean;
          name: string;
          registered_by: string | null;
          remaining_stock: number | null;
          reward_id: number;
          reward_type: string;
          stock: number | null;
          survey_id: number | null;
          value: number | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          expires_at?: string | null;
          image_url?: string | null;
          is_claimed?: boolean;
          name: string;
          registered_by?: string | null;
          remaining_stock?: number | null;
          reward_id?: number;
          reward_type: string;
          stock?: number | null;
          survey_id?: number | null;
          value?: number | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          expires_at?: string | null;
          image_url?: string | null;
          is_claimed?: boolean;
          name?: string;
          registered_by?: string | null;
          remaining_stock?: number | null;
          reward_id?: number;
          reward_type?: string;
          stock?: number | null;
          survey_id?: number | null;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "rewards_registered_by_fkey";
            columns: ["registered_by"];
            isOneToOne: false;
            referencedRelation: "service_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rewards_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
        ];
      };
      service_users: {
        Row: {
          avatar_url: string | null;
          background_url: string | null;
          bio: string | null;
          created_at: string;
          description: string | null;
          email: string | null;
          id: string;
          metadata: Json | null;
          name: string | null;
          phone: string | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          background_url?: string | null;
          bio?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id: string;
          metadata?: Json | null;
          name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          background_url?: string | null;
          bio?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          metadata?: Json | null;
          name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      surveys: {
        Row: {
          created_at: string | null;
          created_by: string;
          description: string | null;
          end_date: string | null;
          has_rewards: boolean;
          metadata: Json | null;
          slug: string | null;
          start_date: string | null;
          status: string;
          survey_id: number;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by: string;
          description?: string | null;
          end_date?: string | null;
          has_rewards: boolean;
          metadata?: Json | null;
          slug?: string | null;
          start_date?: string | null;
          status: string;
          survey_id?: number;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string;
          description?: string | null;
          end_date?: string | null;
          has_rewards?: boolean;
          metadata?: Json | null;
          slug?: string | null;
          start_date?: string | null;
          status?: string;
          survey_id?: number;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "surveys_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "service_users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_gachas: {
        Row: {
          acquired_at: string | null;
          expires_at: string | null;
          gacha_id: number | null;
          is_expired: boolean | null;
          pulls_remaining: number | null;
          pulls_used: number | null;
          response_id: number | null;
          survey_id: number | null;
          user_gacha_id: number;
          user_id: string;
        };
        Insert: {
          acquired_at?: string | null;
          expires_at?: string | null;
          gacha_id?: number | null;
          is_expired?: boolean | null;
          pulls_remaining?: number | null;
          pulls_used?: number | null;
          response_id?: number | null;
          survey_id?: number | null;
          user_gacha_id?: never;
          user_id: string;
        };
        Update: {
          acquired_at?: string | null;
          expires_at?: string | null;
          gacha_id?: number | null;
          is_expired?: boolean | null;
          pulls_remaining?: number | null;
          pulls_used?: number | null;
          response_id?: number | null;
          survey_id?: number | null;
          user_gacha_id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_gachas_gacha_id_fkey";
            columns: ["gacha_id"];
            isOneToOne: false;
            referencedRelation: "gachas";
            referencedColumns: ["gacha_id"];
          },
          {
            foreignKeyName: "user_gachas_response_id_fkey";
            columns: ["response_id"];
            isOneToOne: false;
            referencedRelation: "responses";
            referencedColumns: ["response_id"];
          },
          {
            foreignKeyName: "user_gachas_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
          {
            foreignKeyName: "user_gachas_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "service_users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_rewards: {
        Row: {
          acquired_at: string | null;
          claimed_at: string | null;
          gacha_id: number | null;
          redemption_code: string | null;
          reward_id: number | null;
          status: string | null;
          survey_id: number;
          user_gacha_id: number | null;
          user_id: string;
          user_reward_id: number;
        };
        Insert: {
          acquired_at?: string | null;
          claimed_at?: string | null;
          gacha_id?: number | null;
          redemption_code?: string | null;
          reward_id?: number | null;
          status?: string | null;
          survey_id: number;
          user_gacha_id?: number | null;
          user_id: string;
          user_reward_id?: never;
        };
        Update: {
          acquired_at?: string | null;
          claimed_at?: string | null;
          gacha_id?: number | null;
          redemption_code?: string | null;
          reward_id?: number | null;
          status?: string | null;
          survey_id?: number;
          user_gacha_id?: number | null;
          user_id?: string;
          user_reward_id?: never;
        };
        Relationships: [
          {
            foreignKeyName: "user_rewards_gacha_id_fkey";
            columns: ["gacha_id"];
            isOneToOne: false;
            referencedRelation: "gachas";
            referencedColumns: ["gacha_id"];
          },
          {
            foreignKeyName: "user_rewards_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["reward_id"];
          },
          {
            foreignKeyName: "user_rewards_survey_id_fkey";
            columns: ["survey_id"];
            isOneToOne: false;
            referencedRelation: "surveys";
            referencedColumns: ["survey_id"];
          },
          {
            foreignKeyName: "user_rewards_user_gacha_id_fkey";
            columns: ["user_gacha_id"];
            isOneToOne: false;
            referencedRelation: "user_gachas";
            referencedColumns: ["user_gacha_id"];
          },
          {
            foreignKeyName: "user_rewards_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "service_users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
  }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
