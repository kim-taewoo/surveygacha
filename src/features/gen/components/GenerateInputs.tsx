import { SubjectInput } from "./SubjectInput";

interface Props {

}

export const GenerateInputs = ({}: Props) => {
  return (
    <>
      <SubjectInput />
      <div className="flex flex-col gap-2">
        <label htmlFor="survey-description" className="text-sm text-gray-500">설문조사 설명</label>
        <textarea id="survey-description" className="h-32 rounded-lg border border-gray-300 px-3 py-2" />
      </div>
    </>
  );
};
