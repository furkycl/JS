"use client";

import LevelPage from "@/components/LevelPage";
import { seniorIntro, seniorModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage
      level="senior"
      intro={seniorIntro}
      modules={seniorModules}
    />
  );
}
