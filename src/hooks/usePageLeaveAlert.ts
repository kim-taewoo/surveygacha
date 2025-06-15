import { useEffect } from "react";

// Hook to handle the beforeunload event
export const usePageLeaveAlert = (shouldAlert = true, message = "변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?") => {
  useEffect(() => {
    // Only add the event listener if shouldAlert is true
    if (!shouldAlert) return;

    // Handler function for the beforeunload event
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Cancel the event and show confirmation dialog
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = message;
      return message; // For older browsers
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldAlert, message]);
};
