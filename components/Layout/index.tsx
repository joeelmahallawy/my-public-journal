import { Box } from "@mantine/core";
import HomePage from "./home";
import Steps from "./steps";
import UseCases from "./usecases";

const Landing = () => {
  return (
    <Box sx={{ background: "#0A1929", color: "white" }}>
      <HomePage />
      <Steps />
      <UseCases />
    </Box>
  );
};
export default Landing;
