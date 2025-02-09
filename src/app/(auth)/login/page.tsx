import Logo from "@/assets/logo";
import { BackArrowHeaderGoBack } from "@/components/layout/BackArrowHeaderGoBack";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default async function Login() {
  return (
    <>
      <BackArrowHeaderGoBack title="" className="absolute inset-x-0 top-0 bg-white" />
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="flex w-full flex-col items-center justify-center">
          <Logo width={188} height={70} />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
