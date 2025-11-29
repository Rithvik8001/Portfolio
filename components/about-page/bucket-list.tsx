import { ProseMono } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { BUCKET_LIST } from "@/constants/bucket-list";

export function BucketList() {
  if (!BUCKET_LIST || BUCKET_LIST.length === 0) return null;

  return (
    <Panel>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PanelHeader>
          <PanelTitle>Bucket List</PanelTitle>
        </PanelHeader>
        <ProseMono className="col-span-2">
          <div>
            <ul className="m-[0_!important]">
              {BUCKET_LIST.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-muted-foreground">•</span>
                  <span
                    className={cn(
                      "text-muted-foreground",
                      item.status === "done" &&
                        "line-through decoration-muted-foreground/50",
                      item.status === "in-progress" &&
                        "animate-gradient bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-[200%_auto] bg-clip-text font-medium text-transparent"
                    )}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ProseMono>
      </div>
    </Panel>
  );
}
