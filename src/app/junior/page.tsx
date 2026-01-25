"use client";

import LevelPage from "@/components/LevelPage";
import { juniorIntro, juniorModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage
      level="junior"
      intro={juniorIntro}
      modules={juniorModules}
    />
  );
}
