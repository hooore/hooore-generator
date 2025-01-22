"use client";
import { addAPIProvider } from "@iconify/react";

addAPIProvider("", {
  resources: [process.env.NEXT_PUBLIC_ICONIFY_API_URL],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return children;
}
