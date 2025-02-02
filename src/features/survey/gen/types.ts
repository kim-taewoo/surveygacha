import { Question, QuestionType } from "../types";

export type GenerateSurveyParams = {
  subject: string;
  question_counts: number;
  question_types: {
    [key in QuestionType]: boolean;
  };
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
