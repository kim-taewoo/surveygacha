import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextareaWithButton } from "@/components/ui/originui/TextareaWithButton";

interface Props {

}

export const SurveyTitleInput = ({}: Props) => {
  return (
    <Card className="mx-5 w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg">설문 주제</CardTitle>
        <CardDescription>예시를 참고해 설문 주제를 입력해주세요. 간단한 설명을 덧붙일 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <TextareaWithButton placeholder="ex) AI 기술 발전에 대한 인식조사. 취준생이 느낄 수 있는 불안감 위주로" />
      </CardContent>
    </Card>
  );
};
