import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import CustomButton from "./Button";

export default function LoginCard() {
  return (
    <Card className="w-[25rem]">
      <CardHeader
        variant="gradient"
        color="green"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Easy Life Card
        </Typography>
      </CardHeader>

      <form action="">
        <CardBody className="flex flex-col gap-4">
          <Input label="Email Address" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <CustomButton />
        </CardFooter>
      </form>
    </Card>
  );
}
