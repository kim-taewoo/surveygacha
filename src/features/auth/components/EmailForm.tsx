"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

interface Props {

}

export function EmailForm({}: Props) {
  const [emailSendStatus, setEmailSendStatus] = useState<
    "READY" | "SUCCESS" | "FAILED"
  >("READY");

  const supabase = getSupabaseBrowserClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
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
    <Form {...form}>
      <form
        onSubmit={() => {}}
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
  );
}
