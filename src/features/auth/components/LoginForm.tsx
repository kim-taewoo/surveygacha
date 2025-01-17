"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AlertError from "@/components/AlertError";
import { AlertWithLink } from "@/components/AlertWithLink";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
});

export function LoginForm() {
  const supabase = getSupabaseBrowserClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [redirectTo, setRedirectTo] = useState(() => {
    if (typeof window === "undefined") return "/";
    return `${window.location.origin}/auth/callback?redirect_to=/`;
  });

  function renderEmailProviderLink() {
    const email = form.getValues("email");
    if (!email) return "";
    const emailProvider = email?.split?.("@")?.[1]?.split(".")?.[0];
    if (!emailProvider) return "";
    let emailProviderLink = "";
    switch (emailProvider) {
      case "gmail":
        emailProviderLink = "https://mail.google.com/";
        break;
      case "naver":
        emailProviderLink = "https://mail.naver.com/";
        break;
      case "kakao":
        emailProviderLink = "https://mail.kakao.com/";
        break;
      case "hanmail":
        emailProviderLink = "https://mail.daum.net/";
        break;
      case "icloud":
        emailProviderLink = "https://www.icloud.com/";
        break;
      case "outlook":
        emailProviderLink = "https://outlook.live.com/";
        break;
      case "yahoo":
        emailProviderLink = "https://mail.yahoo.com/";
        break;
      default:
        emailProviderLink = "";
        break;
    }

    return emailProviderLink;
  }

  const [isLoggingIn, setIsLogginIn] = useState(false);
  const [emailSendStatus, setEmailSendStatus] = useState<
    "READY" | "SUCCESS" | "FAILED"
  >("READY");

  const isLoading = form.formState.isSubmitting || isLoggingIn;

  async function signInWithOAuth(provider: "kakao" | "google" | "github") {
    setIsLogginIn(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    setIsLogginIn(false);
  }

  async function signInWithOTP(values: z.infer<typeof formSchema>) {
    setIsLogginIn(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
    if (!error) {
      toast.success("이메일을 확인해주세요.");
      setEmailSendStatus("SUCCESS");
    }
    else {
      toast.error("이메일을 보내는 중 오류가 발생했습니다.");
      setEmailSendStatus("FAILED");
    }
    setIsLogginIn(false);
  }

  return (
    <div className="flex size-full min-h-[50vh] flex-col items-center justify-center">
      <Card className="mx-auto w-full max-w-sm border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">안녕하세요 :)</CardTitle>
          <CardDescription>
            <div className="">첫 로그인이라면 회원가입으로 진행됩니다.</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-4 flex flex-col gap-4">
          <Button
            onClick={() => signInWithOAuth("kakao")}
            variant="outline"
            className="w-full bg-[#FFEB00] text-[#121212]"
          >
            <MessageCircle className="fill-[#121212]" />
            카카오로 로그인
          </Button>
          <div className="relative flex items-center justify-between gap-3">
            <Separator className="shrink" />
            <div className="shrink-0 grow text-sm opacity-70">또는</div>
            <Separator className="shrink" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(signInWithOTP)}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">이메일</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="example@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {emailSendStatus === "READY"
                ? (
                  <Button
                    type="submit"
                    className={cn(
                      "w-full",
                      isLoading && "bg-muted text-[#121212]",
                    )}
                    aria-disabled={form.formState.isSubmitting || isLoggingIn}
                  >
                    {form.formState.isSubmitting || isLoggingIn
                      ? (
                        <span className="flex items-center justify-center gap-1">
                          <LoadingCircle className="text-[#121212]" />
                          {" "}
                          <span>메일 보내는 중...</span>
                        </span>
                      )
                      : (
                        <>
                          <Mail />
                          Email 링크로 로그인
                        </>
                      )}
                  </Button>
                )
                : emailSendStatus === "SUCCESS"
                  ? (
                    <AlertWithLink
                      label="메일 전송 성공!"
                      linkLabel="Email"
                      link={renderEmailProviderLink()}
                    />
                  )
                  : (
                    <AlertError />
                  )}
            </form>
          </Form>
          {/* <div className="relative my-6 flex items-center justify-between gap-3">
            <Separator className="shrink" />
            <div className="shrink-0 grow text-sm opacity-70">또는</div>
            <Separator className="shrink" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">이메일</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="example@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">비밀번호</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-xs opacity-60 underline"
                          tabIndex={-1}
                        >
                          비밀번호를 잊었나요?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={`w-full ${form.formState.isSubmitting ? "bg-muted" : ""}`}
                  aria-disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center gap-1">
                      <LoadingCircle /> <span>로그인 중...</span>
                    </span>
                  ) : (
                    "로그인"
                  )}
                </Button>
              </div>
            </form>
          </Form> */}
        </CardContent>
      </Card>
    </div>
  );
}
