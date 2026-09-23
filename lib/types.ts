export const regions = ["港島", "九龍", "新界"] as const;
export type Region = (typeof regions)[number];

export const storyTopics = ["教養觀", "學習", "社區", "情緒", "家庭分工"] as const;
export type StoryTopic = (typeof storyTopics)[number];

export const eventTypes = ["線下茶聚", "親子活動", "網上聚會", "工作坊"] as const;
export type EventType = (typeof eventTypes)[number];

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  topic: StoryTopic;
  author: string;
  role: string;
  district: string;
  date: string;
  minutes: number;
  mark: string;
  wash: string;
  ink: string;
  body: string[];
};

export type CommunityEvent = {
  slug: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  place: string;
  district: string;
  region: Region | "網上";
  spots: string;
  summary: string;
  bring: string[];
  details: string[];
  host: string;
};

export type Group = {
  name: string;
  region: Region;
  district: string;
  members: number;
  rhythm: string;
  blurb: string;
  next: string;
  status: "開放" | "籌備中";
};

export type ResourceSection = {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

export type Resource = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  sections: ResourceSection[];
};

export type Voice = {
  quote: string;
  by: string;
};
