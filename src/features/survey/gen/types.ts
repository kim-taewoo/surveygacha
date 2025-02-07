import { Question, QuestionType } from "../types";

export type GenerateSurveyParams = {
  subject: string;
  question_counts: number;
  question_types: {
    [key in QuestionType]: boolean;
  };
};

export type TargetAudience = {
  primary_audience?: string;
  demographics?: {
    age_range: string[];
  };
};

export type GeneratedSurvey = {
  title: string;
  description: string;
  target_audience?: TargetAudience;
  questions: Question[];
};
