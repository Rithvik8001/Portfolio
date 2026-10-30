import {
  BriefcaseIcon,
  CodeIcon,
  LightbulbIcon,
} from "@phosphor-icons/react/ssr";
import { UTM_PARAMS } from "@/constants/utm-params";
import { addQueryParams } from "@/lib/utils";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

function getJobIcon(title: string) {
  if (/(developer|engineer)/i.test(title)) {
    return <CodeIcon />;
  }

  if (/(founder|co-founder)/i.test(title)) {
    return <LightbulbIcon />;
  }

  return <BriefcaseIcon />;
}

type JobItemProps = {
  title: string;
  company: string;
  website: string;
};

export function JobItem({ title, company, website }: JobItemProps) {
  return (
    <IntroItem>
      <IntroItemIcon>{getJobIcon(title)}</IntroItemIcon>

      <IntroItemContent>
        {title} @
        <IntroItemLink
          className="ml-0.5 font-medium"
          href={addQueryParams(website, UTM_PARAMS)}
          aria-label={`${company} website`}
        >
          {company}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
