import LevelPage from "@/components/LevelPage";
import { midIntro, midModules } from "@/content/levels";

export default function Page() {
  return (
    <LevelPage title="Mid Level" intro={midIntro} modules={midModules} />
  );
}

