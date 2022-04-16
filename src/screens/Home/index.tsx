import type { NextPage } from "next";
import useHome from "./hooks/useHome";
import tw from "tailwind-styled-components";
import useRequestPermissions from "./hooks/useRequestPermissions";

const Home: NextPage = () => {
  const { gotoVibeCheck } = useHome();

  const { notificationPermissionStatus: notificationPermStatus } =
    useRequestPermissions();

  return (
    <Container>
      <GreetingContainer>
        <Title>Vibes</Title>
        <Subtitle>
          All data is stored locally on your device for your privacy.
        </Subtitle>
      </GreetingContainer>

      <VibeCheckButton onClick={gotoVibeCheck}>
        Take a Vibe Check
      </VibeCheckButton>

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

const Title = tw.p`
  text-6xl
  font-bold
  gradient-text
`;

const Subtitle = tw.p`
  mt-2

  text-md
  text-gray-400
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
