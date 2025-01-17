"use server";
import OpenAI from "openai";

import { Survey } from "@/stores/useSurvey";

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
  "survey_title": "설문 제목",
  "description": "설문에 대한 설명",
  "questions": [
    {
      "question_id": 1,
      "question_type": "multiple_choice",
      "question_text": "귀하의 현재 상태는 어떻게 되십니까?",
      "options": ["취업 준비 중", "인턴 또는 아르바이트 중", "졸업 예정", "기타"]
    },
  ],
},
`;

export async function getResponseFromAI(user_prompt: string): Promise<Survey | string> {
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
