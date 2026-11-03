export {};

type EventDataValue =
  boolean | number | string | null | EventData | EventDataValue[];

interface EventData {
  [key: string]: EventDataValue;
}

type UmamiTracker = {
  track: {
    (): Promise<void>;
    (eventName: string): Promise<void>;
    (eventName: string, data: EventData): Promise<void>;
  };
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}
