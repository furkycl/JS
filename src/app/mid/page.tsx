"use client";

import LevelPage from "@/components/LevelPage";
import { midIntro, midModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage
      level="mid"
      intro={midIntro}
      modules={midModules}
    />
  );
}
