import { ChevronDownIcon } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import type { AnalyticsEvent } from "@/lib/analytics";

const Slot = SlotPrimitive.Slot;

export function CollapsibleList<T>({
  items,
  max = 3,

  keyExtractor,
  renderItem,
  trackEvent,
}: {
  items: T[];
  max?: number;

  keyExtractor?: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  trackEvent?: AnalyticsEvent;
}) {
  return (
    <CollapsibleWithContext trackEvent={trackEvent}>
      {items.slice(0, max).map((award, index) => (
        <Slot
          key={typeof keyExtractor === "function" ? keyExtractor(award) : index}
          className="border-b border-edge"
        >
          {renderItem(award)}
        </Slot>
      ))}

      <CollapsibleContent>
        {items.slice(max).map((award, index) => (
          <Slot
            key={
              typeof keyExtractor === "function"
                ? keyExtractor(award)
                : max + index
            }
            className="border-b border-edge"
          >
            {renderItem(award)}
          </Slot>
        ))}
      </CollapsibleContent>

      {items.length > max && (
        <div className="flex h-12 items-center justify-center pb-px">
          <CollapsibleTrigger asChild>
            <Button
              className="group/collapsible-trigger flex"
              variant="default"
            >
              <span className="hidden group-data-[state=closed]/collapsible-trigger:block">
                Show More
              </span>

              <span className="hidden group-data-[state=open]/collapsible-trigger:block">
                Show Less
              </span>

              <ChevronDownIcon
                className="group-data-[state=open]/collapsible-trigger:rotate-180"
                aria-hidden
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      )}
    </CollapsibleWithContext>
  );
}
