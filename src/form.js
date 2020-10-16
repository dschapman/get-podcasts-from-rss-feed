import styled from "@emotion/styled";
import downloadPodcast from "./download-podcast";
import Parser from "rss-parser";
import Page from "./loading";

const colors = {
  prussianblue: "#0b3954",
  metallicseaweed: "#087E8B",
  lightblue: "#ADD8E6",
  sizzlingred: "#FF5a5F",
  lava: "#c81D25",
};

const MyForm = styled.form`
  color: ${colors.prussianblue};

  margin-top: 20px;
  display: inline-block;
  background: gainsboro;
  border-radius: 10px;
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  input,
  button {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    border: 0; // remove default border
    border-bottom: 3px solid ${colors.lightblue}; // add only bottom border
    background: white;
    :focus {
      outline: none;
      background-color: aliceblue;
      border-color: black;
    }
  }
  button {
    width: 30%;
  }
  label {
    font-size: 0.75rem;
  }
  h2 {
    text-align: center;
    margin-top: 0;
    color: ${colors.metallicseaweed};
  }
`;

const FeedPreview = styled.div`
  border: solid ${colors.lightblue} 4px;
  padding: 10px;
  border-radius: 10px;
  background: aliceblue;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  button {
    text-align: center;
  }
  #description {
    font-size: 14px;
    text-align: left;
  }
  h3 {
    color: ${colors.sizzlingred};
    text-align: center;
  }
  .message {
    color: ${colors.lava};
    font-size: 0.75rem;
  }
`;

function ErrorMessage({ error }) {
  const Message = styled.span`
    color: ${colors.lava};
  `;
  if (error) {
    console.log(error);
    return <Message>{error}</Message>;
  } else {
    return <></>;
  }
}

function Form() {
  const [rssUrl, setRssUrl] = React.useState("");
  const [feed, setFeed] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [downloads, setDownloads] = React.useState(0);

  function handleChange(event) {
    setRssUrl(event.target.value);
  }

  React.useEffect(() => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    if (status === "loading") {
      const MyParser = new Parser();
      setFeed(null);
      async function fetchData() {
        await MyParser.parseURL(CORS_PROXY + rssUrl).then((feed) => {
          console.log(feed);
          setFeed(feed);
          setStatus("");
        }),
          (error) => {
            setError(error);
            console.log(error);
          };
      }
      fetchData();
    }
    if (status === "downloading") {
      setStatus("downloading");
      async function fetchData() {
        await downloadPodcast({ feed, downloads, setDownloads, CORS_PROXY });
        setStatus("");
      }
      fetchData();
    }
  }, [status, feed]);

  function Feed() {
    function DownloadStatus() {
      if (status === "") {
        return (
          <div className="message">
            Warning this will download all {feed.items.length} episodes.
          </div>
        );
      } else if (status === "downloading") {
        return (
          <div>
            <Page isLoading={true} />
          </div>
        );
      } else {
        return <></>;
      }
    }

    if (feed) {
      return (
        <FeedPreview>
          <h3>{feed.title}</h3>
          <p id="description">{feed.description}</p>
          <button
            disabled={status == "downloading"}
            onClick={(event) => {
              event.preventDefault();
              setDownloads(0);
              setStatus("downloading");
            }}
          >
            Download
          </button>
          <DownloadStatus />
        </FeedPreview>
      );
    } else {
      return <></>;
    }
  }

  return (
    <MyForm>
      <h2>Podcast Fetcher</h2>
      <h3>THIS IS IN PROGRESS</h3>
      <p>🐞s ABOUND! PROCEED AT YOUR OWN RISK ⚠️</p>
      <p>
        This website let's you download the mp3 files for your favorite podcast.
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

      <button
        onClick={(event) => {
          event.preventDefault();
          setStatus("loading");
        }}
        disabled={status == "loading"}
      >
        Submit
      </button>
      <ErrorMessage error={error} />
      <Page isloading={status === "loading"} />
      <Feed />
    </MyForm>
  );
}

export default Form;
