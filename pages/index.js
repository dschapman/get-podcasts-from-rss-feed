import styled from "@emotion/styled";
import Form from "../src/form";

const Container = styled.div`
  display: block;
  text-align: center;
  #attribution {
    padding-top: 1rem;
  }
`;

function HomePage() {
  return (
    <Container>
      <Form />
      <div id="attribution">
        Site designed by <a href="https://danielchapman.dev">Daniel Chapman</a>
      </div>
    </Container>
  );
}

export default HomePage;
