export * from "./supabase";

// TODO: 아래 mock data 타입들 삭제
// 설문조사 관련 타입 정의
export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface SurveyInfo {
  title: string;
  description: string;
  duration: string;
  targetAge: string;
  reward: string;
}
