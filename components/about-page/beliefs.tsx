import { ProseMono } from "@/components/ui/typography";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { BELIEFS } from "@/constants/beliefs";

export function Beliefs() {
  if (!BELIEFS || BELIEFS.length === 0) return null;

  return (
    <Panel>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PanelHeader>
          <PanelTitle>Beliefs</PanelTitle>
        </PanelHeader>
        <ProseMono className="col-span-2">
          <div>
            <ul className="m-[0_!important]">
              {BELIEFS.map((belief, index) => (
                <li
                  key={index}
                  className="flex items-start text-muted-foreground"
                >
                  <span className="mr-2">•</span>
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
          </div>
        </ProseMono>
      </div>
    </Panel>
  );
}
