import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { EDUCATION } from "@/constants/education";
import { ExperiencePositionItem } from "./experiences/experience-position-item";

export function Education() {
  return (
    <Panel id="education">
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>
      <div className="space-y-4 py-4 pr-2 pl-4">
        {EDUCATION.map((item) => (
          <ExperiencePositionItem key={item.id} position={item} />
        ))}
      </div>
    </Panel>
  );
}
