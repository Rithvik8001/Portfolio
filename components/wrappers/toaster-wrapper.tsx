"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

const ToasterWrapper = () => {
  return <Toaster />;
};

export default ToasterWrapper;
