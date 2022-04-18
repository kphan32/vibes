import type { NextPage } from "next";
import useHome from "./hooks/useHome";
import tw from "tailwind-styled-components";
import {
  GradientButton,
  GradientTitle,
  Subtitle,
} from "../../components/common";

const Home: NextPage = () => {
  const { gotoVibeCheck } = useHome();

  return (
    <Container>
      <GreetingContainer>
        <GradientTitle>Vibes</GradientTitle>
        <Subtitle>
          All vibe checks are stored locally for your privacy.
        </Subtitle>
      </GreetingContainer>

      <GradientButton onClick={gotoVibeCheck}>Take a Vibe Check</GradientButton>
    </Container>
  );
};

const Container = tw.div`
  w-screen
  h-screen

  flex
  flex-col
  justify-center
  items-center
  space-y-8

  px-4
  
  text-center
`;

const GreetingContainer = tw.div`
  w-64
`;

export default Home;
