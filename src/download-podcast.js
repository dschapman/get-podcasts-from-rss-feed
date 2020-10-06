import axios from "axios";

import fileDownload from "js-file-download";

async function downloadPodcast({ filename, url }) {
  await axios
    .get(url, { responseType: "blob" })
    .then((res) => {
      fileDownload(res.data, filename);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(`"${title}" downloaded!`);
}

export default downloadPodcast;
