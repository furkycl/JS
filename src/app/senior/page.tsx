import LevelPage from "@/components/LevelPage";
import { seniorIntro, seniorModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage
      title="Senior Level"
      intro={seniorIntro}
      modules={seniorModules}
    />
  );
}

