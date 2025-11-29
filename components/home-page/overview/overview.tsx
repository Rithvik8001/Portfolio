import {
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  MarsIcon,
  VenusIcon,
} from "lucide-react";
import { JOBS } from "@/constants/jobs";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { urlToName } from "@/lib/utils";
import { JobItem } from "./job-item";
import { Panel, PanelContent } from "../../ui/panel";
import { USER } from "@/constants/user";
import { CurrentLocalTimeItem } from "./current-local-time-item";

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>
      <PanelContent className="space-y-2.5">
        {JOBS.map((job, index) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
            />
          );
        })}
        <div className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent aria-label={`Location: ${USER.address}`}>
              {USER.address}
            </IntroItemContent>
          </IntroItem>

          <CurrentLocalTimeItem timeZone={USER.timeZone} />

          <IntroItem>
            <IntroItemIcon>
              <MailIcon />
            </IntroItemIcon>

            <IntroItemContent>
              <IntroItemLink
                href={`mailto:${USER.email}`}
                aria-label={`Send email to ${USER.email}`}
              >
                {USER.email}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <GlobeIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={USER.website}
                aria-label={`Personal website: ${urlToName(USER.website)}`}
              >
                {urlToName(USER.website)}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              {USER.gender === "male" ? <MarsIcon /> : <VenusIcon />}
            </IntroItemIcon>
            <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
              {USER.pronouns}
            </IntroItemContent>
          </IntroItem>
        </div>
      </PanelContent>
    </Panel>
  );
}
