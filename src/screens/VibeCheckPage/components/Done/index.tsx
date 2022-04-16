import { FC } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import tw from "tailwind-styled-components";

const Done: FC<DoneProps> = ({ submitted }) => {
  return (
    <Container submitted={submitted}>
      <Text>Done</Text>
      <DoneIcon />
    </Container>
  );
};

const Container = tw.div`
  ${(props: DoneProps) => (props.submitted ? "opacity-100" : "opacity-0")}

  absolute
  left-0
  top-0

  w-screen
  h-screen
  
  flex
  flex-col
  justify-center
  items-center 
  space-y-4
  
  pointer-events-none
  
  transition-all
  duration-250
`;

const Text = tw.div`
  text-4xl
  font-semibold
`;

const DoneIcon = tw(HiOutlineCheckCircle)`
  w-24
  h-24

  text-green-500
`;

interface DoneProps {
  submitted: boolean;
}

export default Done;
