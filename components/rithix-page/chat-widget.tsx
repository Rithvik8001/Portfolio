"use client";

import * as React from "react";

import { ChatDialog } from "./chat-dialog";
import { ChatWidgetButton } from "./chat-widget-button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <ChatWidgetButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <ChatDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
