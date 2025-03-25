import { InvalidePageIcon } from "@/assets/icons/invalid-page";

export default function EndSurveys() {
  return (
    <div className="flex min-h-screen w-full max-w-md items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-blue-50">
          <InvalidePageIcon />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-gray-900">유효하지 않은 폼입니다</h1>
        <p className="text-gray-600">이미 끝난 설문이거나 응답이 마감되었습니다</p>
      </div>
    </div>
  );
}
