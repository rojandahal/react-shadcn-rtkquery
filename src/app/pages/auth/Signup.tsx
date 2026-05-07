import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "@/components/form/form";
import { FormField } from "@/components/form/form-field";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MathCaptcha from "@/components/common/math-captcha";
import { useNavigate } from "react-router-dom";

type SignupFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const form = useForm({
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormData> = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Signup data:", data);
    setIsLoading(true);
    // TODO: Replace with real signup API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form form={form} onSubmit={onSubmit}>
            <FormField label="Username" name="username" required autoFocus />
            <FormField
              label="Password"
              name="password"
              type="password"
              required
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
            />
            {!captchaPassed && (
              <div className="my-4">
                <MathCaptcha onSuccess={() => setCaptchaPassed(true)} />
              </div>
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading || !captchaPassed}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="underline">
              Login
            </a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
