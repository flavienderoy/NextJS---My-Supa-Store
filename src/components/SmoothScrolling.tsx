"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export function SmoothScrolling({ children }: { children: ReactNode }) {
  // A higher lerp value makes the scroll force "lighter" / more responsive.
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
