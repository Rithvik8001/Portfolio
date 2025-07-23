type BucketListItem = {
  title: string;
  status: "completed" | "in-progress" | "not-started";
};

export const bucketList: BucketListItem[] = [
  {
    title: "Watch Man Utd lift the premier league title",
    status: "not-started",
  },
  {
    title: "Travel the world",
    status: "in-progress",
  },
  {
    title: "Help my parents retire",
    status: "in-progress",
  },
  {
    title: "Visit Apple Park in Cupertino, and meet Tim Cook",
    status: "completed",
  },
];
