"use server"; // 서버 컴포넌트로 실행됨을 명시

import { revalidatePath } from "next/cache"; // 특정 경로를 다시 유효화하는 유틸리티 함수

// 사용자의 답변을 저장하는 함수
export async function saveAnswer(questionId: number, answer: string) {
  // 주어진 질문 ID와 답변을 저장 (실제 데이터베이스 로직 대체 필요)
  console.log(`Saving answer for question ${questionId}: ${answer}`); // 디버깅용 콘솔 출력

  // 데이터베이스 작업을 시뮬레이션하기 위해 100ms 대기
  await new Promise(resolve => setTimeout(resolve, 100));

  // /survey 경로의 데이터를 다시 유효화하여 최신 상태로 갱신 - 리랜더링해야 함.
  // revalidatePath("/survey"); - 필요없다. 서버에서 불러오는 데이터를 새로고침할 필요가 없으니

  // 작업 성공 시 결과 반환
  return { success: true };
}

// 설문조사 전체 답변을 제출하는 함수
export async function submitSurvey(answers: Record<number, string[]>) {
  // 설문조사 답변을 저장 (실제 데이터베이스 로직 대체 필요)
  console.log("Submitting survey answers:", answers); // 디버깅용 콘솔 출력

  // 데이터베이스 작업을 시뮬레이션하기 위해 500ms 대기
  await new Promise(resolve => setTimeout(resolve, 500));

  // /survey 경로의 데이터를 다시 유효화하여 최신 상태로 갱신
  revalidatePath("/survey");

  // 작업 성공 시 결과 반환
  return { success: true };
}
