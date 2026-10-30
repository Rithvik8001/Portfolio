import { BrandContextMenu } from "../ui/brand-context-menu";
import { Panel } from "../ui/panel";
import { RithvikMark } from "../ui/rithvik-mark";

export function Brand() {
  return (
    <Panel>
      <BrandContextMenu>
        <div className="grid">
          <div className="screen-line-after flex items-center justify-center after:z-1">
            <RithvikMark className="h-24 w-auto sm:h-32" />
          </div>
        </div>
      </BrandContextMenu>
    </Panel>
  );
}
