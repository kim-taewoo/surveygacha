export type QuestionType = "single_choice" | "multiple_choice" | "likert_scale" | "open_ended";

export type GenerateSurveyParams = {
  subject: string;
  questionCounts: number;
  questionTypes: {
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
  survey_title: string;
  description: string;
  target_audience: {
    primary_audience: string;
    demographics: {
      age_range: string[];
      education_level?: string[];
      employment_status?: string[];
      location?: string[];
      field_of_study?: string[];
    };
  };
  questions: Question[];
};
