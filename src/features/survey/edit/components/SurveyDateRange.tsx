// @ts-nocheck 추후 사용할 때 재수정

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

interface Props {

}

export function SurveyDateRange({}: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>시작일</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 size-4" />
                {surveyData.startDate
                  ? (
                    formatDate(surveyData.startDate)
                  )
                  : (
                    <span className="text-muted-foreground">날짜 선택</span>
                  )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={surveyData.startDate}
                onSelect={date => handleChange("startDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label>종료일</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 size-4" />
                {surveyData.endDate
                  ? (
                    formatDate(surveyData.endDate)
                  )
                  : (
                    <span className="text-muted-foreground">날짜 선택</span>
                  )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={surveyData.endDate}
                onSelect={date => handleChange("endDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Public/Private Toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="isPublic">공개 설문으로 설정</Label>
        <Switch
          id="isPublic"
          checked={surveyData.isPublic}
          onCheckedChange={checked => handleChange("isPublic", checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => setSurveyData(initialData || {
            title: "",
            description: "",
            isPublic: false,
            startDate: null,
            endDate: null,
          })}
        >
          초기화
        </Button>
        <Button type="submit" className="flex-1">
          저장
        </Button>
      </div>
    </>
  );
}
