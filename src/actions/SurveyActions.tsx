"use server";

import { revalidatePath } from "next/cache";

export async function saveAnswer(questionId: number, answer: string) {
  // TODO: Replace this with your actual database logic
  console.log(`Saving answer for question ${questionId}: ${answer}`);

  // Simulate a database operation
  await new Promise(resolve => setTimeout(resolve, 100));

  // Revalidate the survey page
  revalidatePath("/survey");

  return { success: true };
}

export async function submitSurvey(answers: Record<number, string>) {
  // TODO: Replace this with your actual database logic
  console.log("Submitting survey answers:", answers);

  // Simulate a database operation
  await new Promise(resolve => setTimeout(resolve, 500));

  // Revalidate the survey page
  revalidatePath("/survey");

  return { success: true };
}
