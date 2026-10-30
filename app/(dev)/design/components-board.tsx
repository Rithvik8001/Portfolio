"use client";

import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  ChatCircleIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  FolderIcon,
  GraduationCapIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaperPlaneRightIcon,
  TrashIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Textarea } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Notice } from "@/components/ui/notice";
import { Prose } from "@/components/ui/typography";
import { MetaRow, Row } from "@/components/ui/row";
import { Section } from "@/components/ui/section";
import { Skeleton, SkeletonRow } from "@/components/ui/skeleton";
import { Statement } from "@/components/ui/statement";
import { Step, Steps } from "@/components/ui/steps";
import { Surface } from "@/components/ui/surface";
import { Tile } from "@/components/ui/tile";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { TINTS } from "@/constants/tints";
import { USER } from "@/constants/user";

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <p className="eyebrow">{label}</p>
      {children}
    </section>
  );
}

export function ComponentsBoard() {
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState("Projects");

  return (
    <div className="space-y-12 rounded-tray bg-bg p-6 text-ink">
      <Block label="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">
            <ChatCircleIcon /> Ask Rithix
          </Button>
          <Button variant="secondary">View resume</Button>
          <Button variant="ink">See projects</Button>
          <Button variant="destructive">
            <TrashIcon /> Delete draft
          </Button>
          <Button variant="text">Learn more</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="fill">
            <MagnifyingGlassIcon /> <Kbd>⌘K</Kbd>
          </Button>
          <Button variant="icon" aria-label="Open">
            <ArrowUpRightIcon />
          </Button>
          <Button size="xs">Copy link</Button>
          <Button size="xs" variant="primary">
            Save
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            busy={busy}
            onClick={() => {
              setBusy(true);
              setTimeout(() => setBusy(false), 3000);
            }}
          >
            <PaperPlaneRightIcon /> {busy ? "Sending" : "Send message"}
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="primary" progress={0.6}>
            Uploading
          </Button>
        </div>
      </Block>

      <Block label="Tiles">
        <div className="flex flex-wrap items-end gap-3">
          {TINTS.map((tint) => (
            <Tile key={tint} tint={tint}>
              <FolderIcon />
            </Tile>
          ))}
          <Tile tint="neutral">
            <FolderIcon />
          </Tile>
          <Tile size="sm" tint="blue">
            <CodeIcon />
          </Tile>
          <Tile size="lg" tint="amber">
            <GraduationCapIcon />
          </Tile>
          <Tile size="xl" tint="violet">
            <ChatCircleIcon />
          </Tile>
        </div>
      </Block>

      <Block label="Chips and badges">
        <div className="flex flex-wrap items-center gap-2">
          {["Projects", "Experience", "Skills"].map((label) => (
            <Chip
              key={label}
              asChild
              variant="select"
              selected={selected === label}
            >
              <button type="button" onClick={() => setSelected(label)}>
                {label}
              </button>
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Next.js</Chip>
          <Chip tint="violet">
            <FolderIcon /> Project
          </Chip>
          <Chip tint="blue">TypeScript</Chip>
          <Chip tint="amber">In progress</Chip>
          <Chip tint="green">Done</Chip>
          <Badge>3 projects</Badge>
          <Badge size="small" dot="ok">
            Online
          </Badge>
          <Badge size="small" dot="neutral">
            Offline
          </Badge>
          <Badge size="small" dot="warn">
            Away
          </Badge>
        </div>
      </Block>

      <Block label="Avatar">
        <div className="flex items-end gap-4">
          <Avatar src={USER.avatar} alt="" size={96} status="ok" statusLabel="Online" />
          <Avatar src={USER.avatar} alt="" size={56} status="neutral" />
          <Avatar src={USER.avatar} alt="" size={32} />
        </div>
      </Block>

      <Block label="Fields">
        <div className="grid max-w-xl gap-3">
          <Input placeholder="Ask about my work" />
          <Input
            icon={<MagnifyingGlassIcon />}
            placeholder="Search pages and actions"
          />
          <Input aria-invalid placeholder="Invalid" defaultValue="not an email" />
          <Textarea placeholder="Leave a note" />
        </div>
      </Block>

      <Block label="Rows">
        <Surface variant="fill" className="p-2 sm:p-2">
          <div className="px-3">
            <Row
              scribble={false}
              asChild
              leading={
                <Tile tint="indigo">
                  <ArrowUpRightIcon />
                </Tile>
              }
              title="GitHub"
              caption="Rithvik8001"
              chevron
            >
              <a href="#" />
            </Row>
            <Row
              asChild
              leading={
                <Tile tint="violet">
                  <FolderIcon />
                </Tile>
              }
              title="Snippet Vault"
              caption="A vault for code snippets"
              trailing={<Badge size="small">2024</Badge>}
              chevron
            >
              <a href="#" />
            </Row>
            <Row
              leading={
                <Tile tint="blue">
                  <BriefcaseIcon />
                </Tile>
              }
              title="Associate Web Developer"
              caption="Tata Consultancy Services · Full-time"
              trailing={<Badge size="small" dot="ok">Present</Badge>}
            />
          </div>
        </Surface>
        <div className="space-y-1">
          <MetaRow icon={<MapPinIcon />} label="Louisville, KY, USA" />
          <MetaRow icon={<EnvelopeSimpleIcon />} label={USER.email} meta="Email" />
        </div>
      </Block>

      <Block label="Section, statement, steps">
        <Section
          eyebrow="About"
          heading="A quiet column"
          caption="Eyebrow, heading and a caption that explains the consequence, not the feature."
        >
          <Statement
            facts={["Full stack", "Next.js and React", "Louisville, KY"]}
          >
            Creating with code. Small details matter, and the ones you notice
            are the ones that were finished by hand.
          </Statement>
        </Section>
        <Steps>
          <Step number={1} title="Seek discomfort">
            Growth happens outside the comfortable path.
          </Step>
          <Step number={2} title="Do difficult things">
            They are the most rewarding.
          </Step>
          <Step number={3} title="Discipline over motivation" />
        </Steps>
      </Block>

      <Block label="Notices">
        <div className="grid gap-3">
          <Notice>Rithix answers from the content on this site.</Notice>
          <Notice tone="ok">Copied the mark as SVG.</Notice>
          <Notice
            tone="bad"
            action={
              <Button size="xs" variant="secondary">
                Try again
              </Button>
            }
          >
            Too many messages. Wait a moment before sending another.
          </Notice>
          <Notice tone="warn">Replies may take a few seconds.</Notice>
        </div>
      </Block>

      <Block label="Menu, tray, tooltip, toast">
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Portfolio</DropdownMenuLabel>
              <DropdownMenuItem>
                <FolderIcon /> Projects
                <DropdownMenuShortcut>P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BriefcaseIcon /> Experience
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon /> Clear history
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Open tray</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear chat history</DialogTitle>
                <DialogDescription>
                  Messages are removed from this browser only.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="text">Keep history</Button>
                <Button variant="primary">Clear history</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <SimpleTooltip content="Opens in a new tab">
            <Button variant="icon" aria-label="Open">
              <ArrowUpRightIcon />
            </Button>
          </SimpleTooltip>

          <Button
            variant="secondary"
            onClick={() => toast.success("Copied the mark as SVG")}
          >
            Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast("Message deleted", {
                duration: 8000,
                action: { label: "Undo", onClick: () => undefined },
              })
            }
          >
            Toast with undo
          </Button>
        </div>
      </Block>

      <Block label="Skeleton and empty state">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <SkeletonRow />
            <SkeletonRow />
            <Skeleton className="mt-3 h-24 w-full rounded-card" />
          </div>
          <Surface variant="fill">
            <EmptyState
              icon={<ChatCircleIcon />}
              title="Ask Rithix anything"
              description="Projects, stack, availability. Replies come from this site."
              action={<Button variant="secondary">Start with a question</Button>}
            />
          </Surface>
        </div>
      </Block>

      <Block label="Prose">
        <Prose>
          <p>
            Hey, I&apos;m <strong>Rithvik</strong>. I build web apps with{" "}
            <a href="#">Next.js</a>, React and TypeScript, and I care about the{" "}
            <code>small details</code>.
          </p>
          <ul>
            <li>Self-taught full stack developer</li>
            <li>Football fanatic</li>
          </ul>
          <hr />
          <blockquote>Seek discomfort.</blockquote>
        </Prose>
      </Block>
    </div>
  );
}
