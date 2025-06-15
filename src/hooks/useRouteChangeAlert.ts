import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useRouteChangeAlert = (shouldAlert = true, message = "변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?") => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isAlerted = false;
    const url = `${pathname}?${searchParams}`;

    const handleWindowClose = (e) => {
      if (!shouldAlert) return;
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handleRouteChange = (url) => {
      if (!shouldAlert) return true;
      if (isAlerted) return true;

      // Check if the route change is to a different page
      if (pathname !== url) {
        isAlerted = true;

        // Show confirmation dialog
        const confirm = window.confirm(message);

        if (!confirm) {
          isAlerted = false;
          router.events.emit("routeChangeError");
          // Push the current route to maintain the URL
          router.push(pathname);
          // Reset isAlerted
          setTimeout(() => {
            isAlerted = false;
          }, 100);

          // Throw an error to stop the route change
          throw new Error("Route change aborted");
        }
      }

      return true;
    };
  }, [pathname, searchParams]);
};
