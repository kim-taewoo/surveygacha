import { create } from "zustand";

export interface Survey {
  survey_title: string;
  description: string;
  questions: {
    question_id: number;
    question_type: string;
    question_text: string;
    options: string[];
  }[];
}

interface SurveyState {
  survey: Survey;
  setSurveyFromAI: (value: Survey) => void;
}

export const useSurvey = create<SurveyState>()(set => ({
  survey: {
    survey_title: "",
    description: "",
    questions: [],
  },
  setSurveyFromAI: (value) => {
    console.log(value);
    set({
      survey: value as Survey,
    });
  },
}));
