"use server";
import OpenAI from "openai";

import { GeneratedSurvey, GenerateSurveyParams } from "../types";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const system_prompt = `
[설명]
- 너는 설문 조사 전문가로, 사용자가 제공한 주제와 간단한 설명을 바탕으로 설문 문항을 작성해야 한다.
- 주제가 설문 조사와 관련이 없거나 부적절한 경우, 답변을 거부하고 이유를 설명한다.
- 설문 문항은 명확하고 구체적이어야 하며, 다양한 유형(likert_scale, multiple_choice, single_choice, open_ended)을 포함해야 한다. 이 유형은 문항의 "question_type"으로 표시한다.
[규칙]
1. 주제가 설문 조사와 관련이 없는 경우: "죄송하지만, 이 주제는 설문 조사와 관련이 없어 답변할 수 없습니다."라고 답변한다.
2. 주제가 부적절하거나 모호한 경우: "주제가 너무 모호하거나 부적절합니다. 더 구체적인 주제를 제공해 주세요."라고 답변한다.
6. 설문 문항은 최소 6개, 최대 10개까지 작성한다.
7. 답변은 예시를 참고한 JSON 형식으로 제공한다.
[예시]
{
  survey_title: "AI 기술 발전이 취준생에게 미치는 영향과 불안감에 대한 인식조사",
  description: "본 설문은 AI 기술 발전이 취준생들에게 미치는 영향과 이로 인한 불안감을 조사하기 위해 진행됩니다.",
  target_audience: {
    primary_audience: "취준생",
    demographics: {
      age_range: ["20-24", "25-29", "30-34"],
    },
  },
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      text: "귀하의 현재 상태는 어떻게 되십니까?",
      options: ["취업 준비 중", "인턴 또는 아르바이트 중", "졸업 예정", "기타"],
      required: true,
    },
  ],
}
`;

export async function getResponseFromAI(generateOptions: GenerateSurveyParams): Promise<GeneratedSurvey | string> {
  const messages = [{ role: "system", content: system_prompt },
    { role: "user", content: user_prompt }];

  const completion = await openai.chat.completions.create({
    // @ts-expect-error 정상작동하는데 타입에러로 잡히는중
    messages,
    model: "deepseek-chat",
    response_format: {
      type: "json_object",
    },
  });

  // console.log(completion.choices[0].message.content);

  const response = completion.choices[0].message.content;

  if (!response) return "";
  try {
    return JSON.parse(response);
  }
  catch (error) {
    console.error(error);
    return "";
  }
}

export async function generateSurveyPrompt(params: GenerateSurveyParams): Promise<GeneratedSurvey> {
  const enabledQuestionTypes = Object.entries(params.questionTypes)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type)
    .join(", ");

  const systemPrompt = `You are a survey generation assistant. Generate a survey in JSON format that matches the following TypeScript type:

type GeneratedSurvey = {
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

type Question = {
  id: number;
  type: "single_choice" | "multiple_choice" | "likert_scale" | "open_ended";
  text: string;
  required: boolean;
  options?: string[];
  scale?: string[];
  images?: string[];
};

The response should be strictly in JSON format.`;

  const userPrompt = `Generate a survey about "${params.subject}" with exactly ${
    params.questionCounts
  } questions. Only use these question types: ${enabledQuestionTypes}.

Additional requirements:
1. For single_choice and multiple_choice questions, include 3-5 relevant options
2. For likert_scale questions, use a 5-point scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
3. Each question should have a unique ID starting from 1
4. Make 70% of questions required
5. The title and description should be relevant to the subject
6. Include appropriate target audience information`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const surveyJson = completion.choices[0].message.content;
    if (!surveyJson) {
      throw new Error("No content received from OpenAI");
    }

    // Parse and validate the response
    const survey: GeneratedSurvey = JSON.parse(surveyJson);
    validateSurvey(survey, params);

    return survey;
  }
  catch (error) {
    console.error("Error generating survey:", error);
    throw error;
  }
}
