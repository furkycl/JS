import LevelPage from "@/components/LevelPage";
import { juniorIntro, juniorModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage
      title="Junior Level"
      intro={juniorIntro}
      modules={juniorModules}
    />
  );
}

