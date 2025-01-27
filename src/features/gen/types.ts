export type QuestionType = "single_choice" | "multiple_choice" | "likert_scale" | "open_ended";

export type GenerateSurveyParams = {
  subject: string;
  question_counts: number;
  question_types: {
    [key in QuestionType]: boolean;
  };
};

export type Question = {
  id: number;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[]; // Only for single_choice, multiple_choice and likert_scale
  scale?: string[]; // Only for likert_scale
  images?: string[];
};

export type GeneratedSurvey = {
  title: string;
  description: string;
  target_audience?: {
    primary_audience: string;
    demographics: {
      age_range: string[];
    };
  };
  questions: Question[];
};
