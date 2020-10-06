import styled from "@emotion/styled";

const Container = styled.div`
  width: 100px;
  margin: 0 auto;
  height: 130px;
  border: solid 4px lightblue;
  background: white;
  border-radius: 10%;
  .line {
    position: relative;
    height: 4px;
    width: 0px;
    background: lightgray;
    z-index: 2;
    animation-name: slidein;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .a {
    top: 20px;
    left: 6px;
  }
  .b {
    top: 44px;
    left: 6px;
    animation-delay: 0.5s;
  }
  .c {
    top: 68px;
    left: 6px;
    animation-delay: 1s;
  }
  .d {
    top: 92px;
    left: 6px;
    animation-delay: 1.5s;
  }

  @keyframes slidein {
    from {
      width: 0px;
    }
    to {
      width: 88px;
    }
  }
`;

function Page({ isLoading }) {
  if (isLoading) {
    return (
      <Container>
        <div className="line a"></div>
        <div className="line b"></div>
        <div className="line c"></div>
        <div className="line d"></div>
      </Container>
    );
  } else {
    return <></>;
  }
}

export default Page;
