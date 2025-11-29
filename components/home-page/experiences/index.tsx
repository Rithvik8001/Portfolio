import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { ExperienceItem } from "./experience-item";
import { EXPERIENCES } from "@/constants/experiences";

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>
      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
