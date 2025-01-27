import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { GeneratedSurvey, GenerateSurveyParams } from "@/features/gen/types";

export type SurveyState = GeneratedSurvey & {
  genRawResponse: GeneratedSurvey | null;
  genInputs: GenerateSurveyParams & {
    errors: Partial<Record<keyof SurveyState["genInputs"], string>>;
  };
};

const DEFAULT_SURVEY_STATE: SurveyState = {
  title: "",
  description: "",
  questions: [],
  genRawResponse: null,
  genInputs: {
    subject: "",
    question_counts: 5,
    question_types: {
      single_choice: true,
      multiple_choice: true,
      likert_scale: true,
      open_ended: true,
    },
    errors: {},
  },
};

type SurveyActions = {
  setGenInput: <K extends keyof SurveyState["genInputs"]>(key: K, value: SurveyState["genInputs"][K]) => void;
  setGenInputError: <K extends keyof SurveyState["genInputs"]>(key: K, value: string) => void;
  clearGenInputErrors: () => void;
  setRawResponse: (response: GeneratedSurvey) => void;
};

type SurveyStore = SurveyState & SurveyActions;

export const useSurvey = create<SurveyStore>()(
  immer(set => ({
    ...DEFAULT_SURVEY_STATE,
    setRawResponse: (response) => {
      // TODO: proper error handling
      if (typeof response === "string") return;
      if (!response.title || !response.description || !response.questions) return;
      if (response.questions.length < 5) return;
      set((state) => {
        state.genRawResponse = response as GeneratedSurvey;
      });
    },
    setGenInput: (key, value) => {
      set((state) => {
        state.genInputs[key] = value;
      });
    },
    setGenInputError: (key, value) => {
      set((state) => {
        state.genInputs.errors[key] = value;
      });
    },
    clearGenInputErrors: () => {
      set((state) => {
        state.genInputs.errors = {};
      });
    },
  })),
);
