import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SurveyState } from "@/stores/useSurvey";

interface Props {
  title: string;
  description: string;
  onChange: <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => void;
}

export const SurveyTitleAndDescription = ({ title, description, onChange }: Props) => {
  const handleChange = <K extends keyof SurveyState>(key: K, value: SurveyState[K]) => {
    onChange(key, value);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">
            설문 제목
            <span className="ml-1 text-red-500">*</span>
          </Label>
          <Input
            id="title"
            required
            value={title}
            onChange={e => handleChange("title", e.target.value)}
            placeholder="설문 제목을 입력하세요"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">설문 설명</Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => handleChange("description", e.target.value)}
            placeholder="설문에 대한 설명을 입력하세요"
            className="resize-none"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>

  );
};
