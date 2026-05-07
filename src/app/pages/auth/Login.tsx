import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { STORAGE_KEYS } from "@/constants/storage.constant";
import { useNavigate } from "react-router-dom";
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
import type { LoginResponse } from "@/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type LoginFormData = {
  username: string;
  password: string;
};

export default function Login() {
  const form = useForm({ defaultValues: { username: "", password: "" } });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      const res: LoginResponse = await login(data).unwrap();
      dispatch(
        setCredentials({ user: res.admin, token: res.token.accessToken }),
      );
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.token.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, res.token.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.admin));
      navigate("/dashboard");
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: {
          message?: string;
        };
      };

      form.setError("username", {
        message: err?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </CardContent>
        <CardFooter>
          <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="underline">
              Sign up
            </a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
