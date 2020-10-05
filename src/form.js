import styled from "@emotion/styled";
import Parser from "rss-parser";
import FetchPodcast from "./fetch-podcast";

const MyForm = styled.form`
  font-family: "helvetica neue";
  margin-top: 20px;
  display: inline-block;
  background: gainsboro;
  border-radius: 10px;
  min-width: 300px;
  max-width: 450px;
  padding: 20px;
  text-align: center;
  input {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    border: 0; // remove default border
    border-bottom: 3px solid lightblue; // add only bottom border
    :focus {
      outline: none;
      background-color: hsl(194.7, 53.3%, 90%);
      border-color: black;
    }
  }
  input[type="submit"] {
    width: 30%;
  }
  label {
    font-size: 0.75rem;
  }
  h2 {
    text-align: center;
    margin-top: 0;
  }
`;

function Form() {
  const [rssUrl, setRssUrl] = React.useState("");
  const [feed, setFeed] = React.useState(null);
  function handleChange(event) {
    setRssUrl(event.target.value);
  }

  async function handleUrlSubmit(event) {
    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    event.preventDefault();
    const MyParser = new Parser();
    setFeed(null);
    await MyParser.parseURL(CORS_PROXY + rssUrl, function (err, feed) {
      if (err) throw err;
      setFeed(feed);
    });
    console.log(feed);
  }

  function Feed() {
    if (feed) {
      return (
        <div>
          <h3>{feed.title}</h3>
          <p>{feed.description}</p>
          <ul>
            {feed.items.map((item) => {
              return (
                <li>
                  {item.title} - {item.itunes.summary}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <MyForm>
      <h2>Podcast Fetcher</h2>
      <p>
        Sometimes podcast apps are just inconvenient. You thought you downloaded
        the latest episode, but you go to look for it later and its gone. This
        website let's you download the mp3 files for your favorite podcast.
      </p>
      <label htmlFor="url">
        Enter the url for the podcast RSS feed that you would like to download.
      </label>
      <input
        id="url"
        type="url"
        placeholder="Enter the url for an RSS feed"
        onChange={handleChange}
        value={rssUrl}
      />
      <button htmlFor="url" onClick={handleUrlSubmit}>
        Submit
      </button>
      <Feed />
    </MyForm>
  );
}

export default Form;
