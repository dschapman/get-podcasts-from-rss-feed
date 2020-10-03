import styled from "@emotion/styled";
function Form() {
  const Form = styled.form`
    font-family: "helvetica neue";
    margin-top: 20px;
    display: inline-block;
    background: gainsboro;
    border-radius: 10px;
    max-width: 500px;
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
    h2 {
      text-align: center;
      margin-top: 0;
    }
  `;
  return (
    <Form>
      <h2>Podcast Fetcher</h2>
      <label htmlFor="url">
        Enter the url for the podcast RSS feed that you would like to download.
      </label>
      <input id="url" type="url" placeholder="Enter the url for an RSS feed" />
      <input type="submit" />
    </Form>
  );
}

export default Form;
