import { BackArrowHeaderGoBack } from "@/components/layout/BackArrowHeaderGoBack";
import { SurveyEditContainer } from "@/features/survey/edit/components/SurveyEditContainer";

export default async function SurveyEditPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const { id } = await searchParams;
  // TODO: id 가 존재하면 데이터를 fetch 해 가져와 하위 컴포넌트에 초기 데이터 뿌려주기

  return (
    <div className="flex min-h-screen flex-col">
      <BackArrowHeaderGoBack title="문항 편집" />
      <SurveyEditContainer />
    </div>
  );
}
