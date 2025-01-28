"use client";

import Lottie, { AnimationItem } from "lottie-web";
import React, { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

interface Props {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  isPaused?: boolean;
  isStopped?: boolean;
  className?: string;
}

export const LottieContainer = ({
  animationData,
  loop,
  autoplay,
  speed,
  isPaused,
  isStopped,
  className,
  ...restProps
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const [animationInstance, setAnimationInstance] = useState<AnimationItem | null>(null);

  useEffect(() => {
    const animationOptions = {
      container: animationContainer.current,
      renderer: "svg",
      loop: loop !== undefined ? loop : true,
      autoplay: autoplay !== undefined ? autoplay : true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    // @ts-expect-error 중요치않은 타입에러 발생하나 작동이상 없음
    const animation = Lottie.loadAnimation(animationOptions);
    // Lottie 애니메이션 상태 업데이트
    setAnimationInstance(animation);

    //  컴포넌트 unmount 시 애니메이션 제거
    return () => {
      animation.destroy();
    };
  }, [animationData, loop, autoplay]);

  useEffect(() => {
    if (animationInstance !== null) {
      if (isPaused) {
        animationInstance.pause();
      }
      else {
        animationInstance.play();
      }

      if (isStopped) {
        animationInstance.stop();
      }

      if (speed !== undefined) {
        animationInstance.setSpeed(speed);
      }
    }
  }, [isPaused, isStopped, speed, animationInstance]);

  return <div className={cn(className)} ref={animationContainer} {...restProps} />;
};
