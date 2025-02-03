export type QuestionType = "single_choice" | "multiple_choice" | "likert_scale" | "open_ended";

export type Question = {
  id: string | number;
  type: QuestionType;
  text: string;
  isRequired: boolean;
  options?: string[]; // for single_choice, multiple_choice and likert_scale
  images?: string[];
};
