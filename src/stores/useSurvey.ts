import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Question = {
  id: number;
  type: string;
  description: string;
  options?: string[];
  images?: string[];
};

export type SurveyState = {
  title: string;
  description: string;
  questions: Question[];
  genInputs: {
    subject: string;
    questionCounts: number;
    questionTypes: {
      singleChoice: boolean;
      multipleChoice: boolean;
      likertScale: boolean;
      openEndedShort: boolean;
      openEndedLong: boolean;
    };
    errors: Partial<Record<keyof SurveyState["genInputs"], string>>;
  };
};

const DEFAULT_SURVEY_STATE: SurveyState = {
  title: "",
  description: "",
  questions: [],
  genInputs: {
    subject: "",
    questionCounts: 5,
    questionTypes: {
      singleChoice: true,
      multipleChoice: true,
      likertScale: true,
      openEndedShort: true,
      openEndedLong: true,
    },
    errors: {},
  },
};

type SurveyActions = {
  setGenInput: <K extends keyof SurveyState["genInputs"]>(key: K, value: SurveyState["genInputs"][K]) => void;
  setGenInputError: <K extends keyof SurveyState["genInputs"]>(key: K, value: string) => void;
  clearGenInputErrors: () => void;
};

type SurveyStore = SurveyState & SurveyActions;

export const useSurvey = create<SurveyStore>()(
  immer(set => ({
    ...DEFAULT_SURVEY_STATE,
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
