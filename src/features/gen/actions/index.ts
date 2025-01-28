"use server";
import OpenAI from "openai";

import { GeneratedSurvey, GenerateSurveyParams } from "../types";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

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
options?: string[];//choice
scale?: string[];
};

if
`;

export async function generateSurvey(params: GenerateSurveyParams): Promise<GeneratedSurvey> {
  const enabledQuestionTypes = Object.entries(params.question_types)
    .filter(([_, enabled]) => enabled)
    .map(([type]) => type)
    .join(", ");

  const userPrompt = `Generate a survey about "${params.subject}" with at least ${params.question_counts} questions. Only use these question types: ${enabledQuestionTypes}.

Additional requirements:
- Use Korean as much as possible.
- For single_choice and multiple_choice questions, include 3-5 relevant options
- Each question should have a unique ID starting from 1
- The title and description should be relevant to the subject
- Include appropriate target audience information`;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
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

    return survey;
  }
  catch (error) {
    console.error("Error generating survey:", error);
    throw error;
  }
}
