import tw from "tailwind-styled-components";

const Text = tw.p`
text-gray-800
`;

const Subtitle = tw(Text)`
  mt-2

  text-gray-400
`;

const Title = tw(Text)`
  text-6xl
  font-bold
`;

const GradientTitle = tw(Title)`
  gradient-text
`;

const Button = tw.button`
  px-4
  py-2

  text-gray-400

  rounded-md

  border-2
  border-gray-400
  
  drop-shadow-md

  active:translate-y-1

  active:shadow-md
  active:shadow-gray-200/50
  
  transition-all
`;

const GradientButton = tw(Button)`
  bg-gradient-to-r
  from-cyan-400
  to-blue-400

  text-white
  text-lg

  border-0

  active:shadow-cyan-200/75
`;

export { Text, Subtitle, Title, GradientTitle, Button, GradientButton };
