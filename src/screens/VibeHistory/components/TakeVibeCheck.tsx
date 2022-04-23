import { Text } from "@/components/common";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components";

const TakeVibeCheck = ({ visible }: TakeVibeCheckProps) => {
  const router = useRouter();

  const handleClick = () => router.push("/vibe_check");

  return (
    <Button visible={visible} onClick={handleClick}>
      Click here to take a vibe check
    </Button>
  );
};

const Button = tw(Text)<VisibleProps>`
  mt-8

  text-gray-400
  hover:text-gray-600

  transition-all
  ${({ visible }: VisibleProps) => (visible ? "opacity-100" : "opacity-0")}

  cursor-pointer
`;

interface VisibleProps {
  visible: boolean;
}

interface TakeVibeCheckProps extends VisibleProps {}

export default TakeVibeCheck;
