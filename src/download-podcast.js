import axios from "axios";
import slugify from "slugify";
import fileDownload from "js-file-download";

/**
 * Downloads each podcast in an rss feed.
 *
 * @param {object} feed A podcast rss feed item returned from rss-parser
 * @param {number} downloads A number in state
 * @param {function} setDownloads The function to set the number in state
 * @param {string} CORS_PROXY A proxy to avoid CORS errors. Defaults to https://cors-anywhere.herokuapp.com/
 */
async function downloadPodcast({
  feed,
  downloads,
  setDownloads,
  CORS_PROXY = "https://cors-anywhere.herokuapp.com/",
}) {
  const { items } = feed;

  for (const item of items) {
    const { title, pubDate } = item;
    //Get the date for the filename
    const date = new Date(pubDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const url = CORS_PROXY + item.enclosure.url.replace(/\?.*$/g, "");
    const filename = `${year}-${month}-${day}-${slugify(title, {
      lower: true,
      strict: true,
    })}.mp3`;
    //We assume the file will be an mp3
    //TODO check the filetype

    // if this isn't awaited they all finish at once
    await axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        fileDownload(res.data, filename);
        setDownloads(downloads + 1); //BUG: The state isn't updating here
        console.log(
          `${filename}" downloaded! ${downloads}/${feed.items.length}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
export default downloadPodcast;
