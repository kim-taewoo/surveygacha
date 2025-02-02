"use client";

import { Question } from "../../types";

import QuestionEditor from "./QuestionEditor";

interface Props {
  questions: Question[];
}

export function SurveyQuestions({ questions }: Props) {
  return (
    <>
      {questions.map(question => (
        <QuestionEditor key={question.id} initialQuestion={question} />
      ))}
    </>
  );
}
