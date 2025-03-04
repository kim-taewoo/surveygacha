import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { DEFAULT_MINIMUM_QUESTION_COUNT } from "@/features/survey/gen/consts";
import { GeneratedSurvey, GenerateSurveyParams } from "@/features/survey/gen/types";
import { Question, QuestionType } from "@/features/survey/types";

const SAMPLE_QUESTION: Question = {
  id: "SAMPLE_ID",
  type: "likert_scale",
  text: "예시) 저희 서비스에 얼마나 만족하나요?",
  options: ["매우 불만족", "불만족", "보통", "만족", "매우 만족"],
  isRequired: true,
};

const SAMPLE_QUESTION2: Question = {
  id: "SAMPLE_ID2",
  type: "likert_scale",
  text: "예시) 저희 서비스에 얼마나 만족하나요?",
  options: ["매우 불만족", "불만족", "보통", "만족", "매우 만족"],
  isRequired: true,
};

export type SurveyState = GeneratedSurvey & {
  genRawResponse: GeneratedSurvey | null;
  genInputs: GenerateSurveyParams & {
    errors: Partial<Record<keyof SurveyState["genInputs"], string | undefined>>;
  };
  isLoading: boolean;
  start_date?: string;
  end_date?: string;
  is_draft?: boolean;
};

const DEFAULT_SURVEY_STATE: SurveyState = {
  title: "",
  description: "",
  questions: [SAMPLE_QUESTION, SAMPLE_QUESTION2],
  genRawResponse: null,
  genInputs: {
    subject: "",
    question_counts: DEFAULT_MINIMUM_QUESTION_COUNT,
    question_types: {
      single_choice: true,
      multiple_choice: true,
      likert_scale: true,
      open_ended: true,
    },
    errors: {},
  },
  isLoading: false,
};

type SurveyActions = {
  getQuestionIds: () => string[];
  setIsLoading: (isLoading: boolean) => void;
  setSurveyState: (state: Partial<SurveyState>) => void;
  setGenInput: <K extends keyof SurveyState["genInputs"]>(key: K, value: SurveyState["genInputs"][K]) => void;
  setSurveyFieldState: <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => void;
  setGenInputError: <K extends keyof SurveyState["genInputs"]>(key: K, value: string | undefined) => void;
  clearGenInputErrors: () => void;
  setRawResponse: (response: GeneratedSurvey) => void;

  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateQuestionText: (questionId: string, text: string) => void;
  updateQuestionType: (questionId: string, type: QuestionType) => void;
  updateQuestionOption: (questionId: string, optionIndex: number, value: string) => void;
  addQuestionOption: (questionId: string) => void;
  removeQuestionOption: (questionId: string, optionIndex: number) => void;
  toggleQuestionRequired: (questionId: string) => void;
  addQuestion: (type: QuestionType) => void;
  updateQuestionOptions: (questionId: string, options: string[]) => void;
  removeQuestion: (questionId: string) => void;
  moveQuestionUp: (questionId: string) => void;
  moveQuestionDown: (questionId: string) => void;
  reorderQuestion: (oldIndex: number, newIndex: number) => void;
};

type SurveyStore = SurveyState & SurveyActions;

export const useSurvey = create<SurveyStore>()(
  immer((set, get) => ({
    ...DEFAULT_SURVEY_STATE,

    getQuestionIds: () => get().questions.map(q => q.id),

    setIsLoading: (isLoading) => {
      set((state) => {
        state.isLoading = isLoading;
      });
    },
    setSurveyState: (newState) => {
      set((state) => {
        Object.assign(state, newState);
      });
    },
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
    setSurveyFieldState: (key, value) => {
      set((state) => {
        (state as SurveyState)[key] = value;
      });
    },

    updateTitle: title => set((state) => {
      state.title = title;
    }),

    updateDescription: description => set((state) => {
      state.description = description;
    }),

    updateQuestionText: (questionId, text) => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.text = text;
      }
    }),

    updateQuestionType: (questionId, type) => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.type = type;
        question.options = type === "likert_scale"
          ? ["매우 불만족", "불만족", "보통", "만족", "매우 만족"]
          : ["옵션 1", "옵션 2", "옵션 3"];
      }
    }),

    updateQuestionOptions: (questionId, options) => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.options = options;
      }
    }),

    updateQuestionOption: (questionId, optionIndex, value) => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question && question.options?.[optionIndex] !== undefined) {
        question.options[optionIndex] = value;
      }
    }),

    addQuestionOption: questionId => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.options?.push("새 옵션");
      }
    }),

    removeQuestionOption: (questionId, optionIndex) => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.options?.splice(optionIndex, 1);
      }
    }),

    toggleQuestionRequired: questionId => set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.isRequired = !question.isRequired;
      }
    }),

    addQuestion: type => set((state) => {
      state.questions.push({
        id: uuidv4(),
        type,
        text: "새 질문",
        options: type === "likert_scale"
          ? ["매우 불만족", "불만족", "보통", "만족", "매우 만족"]
          : ["옵션 1", "옵션 2", "옵션 3"],
        isRequired: false,
      });
    }),

    removeQuestion: questionId => set((state) => {
      const index = state.questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        state.questions.splice(index, 1);
      }
    }),

    // Move a question up in the order (towards the beginning of the array)
    moveQuestionUp: questionId => set((state) => {
      const index = state.questions.findIndex(q => q.id === questionId);
      if (index > 0) {
        // Swap this question with the one before it
        const temp = state.questions[index];
        state.questions[index] = state.questions[index - 1];
        state.questions[index - 1] = temp;
      }
    }),

    // Move a question down in the order (towards the end of the array)
    moveQuestionDown: questionId => set((state) => {
      const index = state.questions.findIndex(q => q.id === questionId);
      if (index !== -1 && index < state.questions.length - 1) {
        // Swap this question with the one after it
        const temp = state.questions[index];
        state.questions[index] = state.questions[index + 1];
        state.questions[index + 1] = temp;
      }
    }),

    // More flexible reordering (useful for drag and drop)
    reorderQuestion: (oldIndex, newIndex) => set((state) => {
      if (
        oldIndex >= 0
        && oldIndex < state.questions.length
        && newIndex >= 0
        && newIndex < state.questions.length
        && oldIndex !== newIndex
      ) {
        // Remove the question from the old position
        const [question] = state.questions.splice(oldIndex, 1);
        // Insert it at the new position
        state.questions.splice(newIndex, 0, question);
      }
    }),
  })),
);
