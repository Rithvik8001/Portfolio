import { CertificationItem } from "./certification-item";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { CollapsibleList } from "@/components/ui/collapsible-list";
import { CERTIFICATIONS } from "@/constants/certifications";

export function Certifications() {
  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({CERTIFICATIONS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={CERTIFICATIONS}
        max={8}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
