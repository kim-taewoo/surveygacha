import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BreadcrumbHeaderProps = {
  title: string;
  link?: string;
};

export const BreadcrumbHeader = ({ title, link }: BreadcrumbHeaderProps) => {
  const router = useRouter();
  const onBackClick = () => {
    if (link) {
      router.push(`${link}`);
    }
    else {
      router.push("/");
    }
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
