import { Input } from "@/components/ui/input";
import { InputWithButton } from "@/components/ui/originui/TextareaWithButton";

interface Props {

}

export const BottomInput = ({}: Props) => {
  return (
    <div className="fixed bottom-7 w-full p-5">
      <InputWithButton placeholder="설문" />
    </div>
  );
};
