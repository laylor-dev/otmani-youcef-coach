"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { useInView } from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
}

export function SplineScene({ scene, className = "", onLoad }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "400px" });

  return (
    <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
      <div ref={ref} className={`w-full h-full ${className}`}>
        {isInView && (
          <Spline
            scene={scene}
            onLoad={onLoad}
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          />
        )}
      </div>
    </Suspense>
  );
}
