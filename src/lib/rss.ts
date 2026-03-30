import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const textURL = await (
    await fetch(feedURL, {
      headers: {
        "User-Agent": "gator",
      },
    })
  ).text();
  const parser = new XMLParser();
  const result = parser.parse(textURL);
  if (!result.rss?.channel) {
    throw new Error("Missing channel property.");
  }
  const channel = result.rss.channel;
  if (!channel.title || !channel.link || !channel.description) {
    throw new Error("Missing additional properties.");
  }
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  const rssItems: RSSItem[] = [];
  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate) {
      continue;
    }
    rssItems.push({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
    });
  }
  const rssFeed: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: rssItems,
    },
  };
  return rssFeed;
}
