import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const getSupabaseReqResClient = (request: NextRequest) => {
  // let response = NextResponse.next({ request: request }) 로 안 하는 이유는, 이렇게 하면 response 객체를 변경할 수 없기 때문이다.
  // 이건 next.js 의 제약(한계)사항으로, value reference 를 따로 만들어서 조작 후 response.value 를 return 해야한다.
  const response = {
    value: NextResponse.next({ request: request }),
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response.value = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.value.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  return { supabase, response };
};
