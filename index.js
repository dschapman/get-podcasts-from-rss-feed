const Parser = require("rss-parser");
const axios = require("axios").default;
const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
const slugify = require("slugify");

let rssParser = new Parser();
if (!fs.existsSync("./output")) {
  fs.mkdir("./output", (error) => {
    if (error) {
      return console.error(error);
    }
  });
} else {
  console.log("Output folder already exists.");
}

const rssUrl = prompt("Enter the url of the RSS feed you want to download: ");
console.log(`You entered ${rssUrl}`);
(async () => {
  const feed = await rssParser.parseURL(rssUrl);
  const { items } = feed;

  for (const item of items) {
    const { title, pubDate } = item;
    const date = new Date(pubDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const url = item.enclosure.url.replace(/\?.*$/g, "");
    const filename = `./output/${year}-${month}-${day}-${slugify(title, {
      lower: true,
      strict: true,
    })}.mp3`;

    await axios
      .get(url, {
        responseType: "stream",
      })
      .then((res) => {
        res.data.pipe(fs.createWriteStream(filename));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`"${title}" downloaded!`);
  }
})();
