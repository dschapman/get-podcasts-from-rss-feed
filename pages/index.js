import styled from "@emotion/styled";
import Form from "../src/form";

const Container = styled.div`
  display: block;
  text-align: center;
`;

function HomePage() {
  return (
    <Container>
      <Form />
    </Container>
  );
}

export default HomePage;
