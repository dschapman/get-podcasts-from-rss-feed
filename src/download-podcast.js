import axios from "axios";
import slugify from "slugify";
import fileDownload from "js-file-download";

async function downloadPodcast({ feed, downloads, setDownloads, CORS_PROXY }) {
  const { items } = feed;

  for (const item of items) {
    const { title, pubDate } = item;
    const date = new Date(pubDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const url = CORS_PROXY + item.enclosure.url.replace(/\?.*$/g, "");
    const filename = `${year}-${month}-${day}-${slugify(title, {
      lower: true,
      strict: true,
    })}.mp3`;
    await axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        fileDownload(res.data, filename);
        setDownloads(downloads + 1);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`${filename}" downloaded!`);
  }
}
export default downloadPodcast;
