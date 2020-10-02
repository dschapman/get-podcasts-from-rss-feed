const Parser = require("rss-parser");
const http = require("http");
const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
let rssParser = new Parser();
fs.mkdir("./output", (error) => {
  if (error) {
    return console.error(error);
  }
});
const rssUrl = prompt("Enter the url of the RSS feed you want to download: ");
console.log(`You entered ${rssUrl}`);
(async () => {
  const feed = await rssParser.parseURL(rssUrl);
  const { items } = feed;
  items.map((item) => {
    const { title, pubDate } = item;
    const url = item.enclosure.url;
    console.log({ title }, { pubDate }, { url });
  });
})();
