"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

import { KakaoLogo } from "@/assets/kakao-logo";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const supabase = getSupabaseBrowserClient();
  const [isLoggingIn, setIsLogginIn] = useState(false);

  const [redirectTo, setRedirectTo] = useState(() => {
    if (typeof window === "undefined") return "/";
    return `${window.location.origin}/auth/callback?redirect_to=/`;
  });

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

  return (
    <div className="mx-auto mt-11 flex w-full max-w-xs flex-col gap-4 border-0 shadow-none">
      <Button
        disabled={isLoggingIn}
        onClick={() => signInWithOAuth("kakao")}
        className="h-12 w-full bg-[#FFEB00] text-base font-semibold text-[#121212] hover:bg-[#FFEB00]/80"
      >
        <KakaoLogo />
        <span className="flex-1 text-center">
          카카오 로그인
        </span>
      </Button>

      <Button
        disabled={isLoggingIn}
        onClick={() => signInWithOAuth("google")}
        className="h-12 w-full text-base font-semibold text-white"
      >
        <span className="mt-1 text-center font-aggro font-extrabold">G</span>
        <span className="flex-1 text-center">
          Google 로그인
        </span>
      </Button>
      {/*
      <Button
        onClick={() => signInWithOAuth("kakao")}
        className="h-12 text-base font-semibold"
      >
        <Mail size={18} />
        <span className="flex-1 text-center">
          이메일 로그인
        </span>
      </Button> */}

    </div>
  );
}
