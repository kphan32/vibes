import type { NextPage } from "next";
import useHome from "./hooks/useHome";
import tw from "tailwind-styled-components";
import useRequestPermissions from "./hooks/useRequestPermissions";
import {
  GradientButton,
  GradientTitle,
  Subtitle,
} from "../../components/common";

const Home: NextPage = () => {
  const { gotoVibeCheck } = useHome();

  const { notificationPermissionStatus: notificationPermStatus } =
    useRequestPermissions();

  return (
    <Container>
      <GreetingContainer>
        <GradientTitle>Vibes</GradientTitle>
        <Subtitle>
          All vibe checks are stored locally for your privacy.
        </Subtitle>
      </GreetingContainer>

      <GradientButton onClick={gotoVibeCheck}>Take a Vibe Check</GradientButton>

      {notificationPermStatus === "denied" && (
        <ErrorMessage>
          Please allow notifications to receive reminders
        </ErrorMessage>
      )}
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

const ErrorMessage = tw.p`
  mt-4

  text-sm
  text-red-400
`;

const VibeCheckButton = tw.button`
  px-4
  py-2

  bg-gradient-to-r
  from-cyan-400
  to-blue-400

  text-white

  rounded-md
  text-lg

  drop-shadow-md
  hover:drop-shadow-lg

  transition-all
`;

export default Home;
