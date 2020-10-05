import axios from "axios";
import slugify from "slugify";
import fileDownload from "js-file-download";

async function downloadPodcast({ feed }) {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  console.log(feed);
  const { items } = feed;

  for (const item of items) {
    const { title, pubDate } = item;
    const date = new Date(pubDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const url = item.enclosure.url.replace(/\?.*$/g, "");
    const filename = `${year}-${month}-${day}-${slugify(title, {
      lower: true,
      strict: true,
    })}.mp3`;

    await axios
      .get(CORS_PROXY + url, { responseType: "blob" })
      .then((res) => {
        fileDownload(res.data, filename);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`"${title}" downloaded!`);
  }
}

export default downloadPodcast;
