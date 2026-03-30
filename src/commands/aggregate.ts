import { fetchFeed } from "../lib/rss";

export async function handlerAgg() {
  const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(JSON.stringify(result, null, 2));
}
