import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { DEFAULT_MINIMUM_QUESTION_COUNT } from "@/features/survey/gen/consts";
import { GeneratedSurvey, GenerateSurveyParams } from "@/features/survey/gen/types";
// import { Question } from "@/features/survey/types";

// const SAMPLE_QUESTION: Question = {
//   id: "SAMPLE_ID",
//   type: "likert_scale",
//   text: "예시) 저희 서비스에 얼마나 만족하나요?",
//   options: ["매우 불만족", "불만족", "보통", "만족", "매우 만족"],
//   isRequired: true,
// };

// const SAMPLE_QUESTION2: Question = {
//   id: "SAMPLE_ID2",
//   type: "likert_scale",
//   text: "예시) 저희 서비스에 얼마나 만족하나요?",
//   options: ["매우 불만족", "불만족", "보통", "만족", "매우 만족"],
//   isRequired: true,
// };

export type SurveyState = GeneratedSurvey & {
  genRawResponse: GeneratedSurvey | null;
  genInputs: GenerateSurveyParams & {
    errors: Partial<Record<keyof SurveyState["genInputs"], string | undefined>>;
  };
  isLoading: boolean;
  startDate?: string;
  endDate?: string;
  isPublic?: boolean;
};

const DEFAULT_SURVEY_STATE: SurveyState = {
  title: "AI 기술이 개발자 취준생들에게 끼치는 영향조사",
  description: "본 설문은 AI 기술의 발전이 개발자 취준생들에게 미치는 영향을 조사하기 위해 마련되었습니다. 여러분의 소중한 의견은 AI 기술과 개발자 취업 시장의 관계를 이해하는 데 큰 도움이 될 것입니다.",
  target_audience: {
    primary_audience: "개발자 취준생",
    demographics: {
      age_range: [
        "20대",
        "30대",
      ],
    },
  },
  questions: [
    {
      id: 1,
      type: "single_choice",
      text: "AI 기술이 개발자 취업 시장에 미치는 영향에 대해 어떻게 생각하시나요?",
      isRequired: true,
      options: [
        "매우 긍정적",
        "긍정적",
        "중립",
        "부정적",
        "매우 부정적",
      ],
    },
    {
      id: 2,
      type: "multiple_choice",
      text: "AI 기술이 개발자에게 요구하는 스킬셋 변화에 대해 어떤 것들이 있다고 생각하시나요? (복수 선택 가능)",
      isRequired: true,
      options: [
        "머신러닝",
        "데이터 분석",
        "클라우드 컴퓨팅",
        "자연어 처리",
        "컴퓨터 비전",
      ],
    },
    {
      id: 3,
      type: "likert_scale",
      text: "AI 기술이 개발자 취업 준비에 있어 중요한 요소라고 생각하시나요?",
      isRequired: true,
      options: [
        "전혀 그렇지 않다",
        "그렇지 않다",
        "보통이다",
        "그렇다",
        "매우 그렇다",
      ],
    },
    {
      id: 4,
      type: "open_ended",
      text: "AI 기술이 개발자 취업 시장에 미치는 긍정적인 영향에 대해 자유롭게 의견을 나눠주세요.",
      isRequired: false,
    },
    {
      id: 5,
      type: "single_choice",
      text: "AI 기술 관련 지식이 개발자 취업에 있어 얼마나 중요하다고 생각하시나요?",
      isRequired: true,
      options: [
        "매우 중요",
        "중요",
        "보통",
        "중요하지 않음",
        "전혀 중요하지 않음",
      ],
    },
    {
      id: 6,
      type: "multiple_choice",
      text: "AI 기술이 개발자 취업 준비 과정에서 어떤 도움을 줄 수 있다고 생각하시나요? (복수 선택 가능)",
      isRequired: true,
      options: [
        "포트폴리오 자동화",
        "코드 리뷰 자동화",
        "면접 준비 도구",
        "개인 맞춤형 학습",
        "기술 트렌드 분석",
      ],
    },
    {
      id: 7,
      type: "likert_scale",
      text: "AI 기술이 개발자로서의 경력 전망에 긍정적인 영향을 미칠 것이라고 생각하시나요?",
      isRequired: true,
      options: [
        "전혀 그렇지 않다",
        "그렇지 않다",
        "보통이다",
        "그렇다",
        "매우 그렇다",
      ],
    },
    {
      id: 8,
      type: "open_ended",
      text: "AI 기술이 개발자 취업 시장에 미치는 부정적인 영향에 대해 자유롭게 의견을 나눠주세요.",
      isRequired: false,
    },
  ],
};

type SurveyActions = {
  setIsLoading: (isLoading: boolean) => void;
  setSurveyState: (state: Partial<SurveyState>) => void;
  setGenInput: <K extends keyof SurveyState["genInputs"]>(key: K, value: SurveyState["genInputs"][K]) => void;
  setSurveyFieldState: <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => void;
  setGenInputError: <K extends keyof SurveyState["genInputs"]>(key: K, value: string | undefined) => void;
  clearGenInputErrors: () => void;
  setRawResponse: (response: GeneratedSurvey) => void;
};

type SurveyStore = SurveyState & SurveyActions;

export const useSurvey = create<SurveyStore>()(
  immer((set, get) => ({
    ...DEFAULT_SURVEY_STATE,
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
  })),
);
