import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  link?: string;
};

export const PageHeader = ({ title, link }: PageHeaderProps) => {
  const router = useRouter();
  const onBackClick = () => {
    router.push(`/${link}`);
  };

  return (
    <div className="flex items-center gap-2 p-4">
      <button
        onClick={onBackClick}
        className="text-gray-900"
      >
        <span><ArrowLeft /></span>
      </button>
      <span>{title}</span>

    </div>
  );
};
