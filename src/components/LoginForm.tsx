"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const { z } = require("zod");
import { loginFormSchema } from "@/validation/loginForm";
import { validateDataForZodSchema } from "@/helpers/zodValidator";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";
import { Card, CardContent } from "./ui/card";
import { BorderBeam } from "./magicui/border-beam";

interface IFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props: any): React.ReactElement => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

  /**
   * Handles the form submission by validating the form data against a Zod schema.
   *
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    const { success, errors } = await validateDataForZodSchema(
      formData,
      loginFormSchema
    );
    if (!success) {
      let messages = errors?.map((e) => e.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: messages?.join(", "),
      });
      setIsLoading(false);
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res?.error,
      });
      setIsLoading(false);
      return;
    }
    toast({
      variant: "default",
      title: "Success",
      description: "Login successful",
    });
    setFormData({
      username: "",
      password: "",
    });
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <Card className="relative flex flex-col gap-4 w-full lg:w-1/3 px-8 py-12">
      <div className="space-y-2">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
          Login to your account
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your username/email and password below to login to your account.
        </p>
      </div>
      <Input
        value={formData.username}
        type="text"
        placeholder="Username/Email"
        onChange={({ target }) => {
          setFormData({ ...formData, username: target.value });
        }}
      />
      <Input
        value={formData.password}
        type="password"
        placeholder="Password"
        onChange={({ target }) => {
          setFormData({ ...formData, password: target.value });
        }}
      />
      <Button disabled={isLoading} onClick={handleSubmit}>
        Login
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          signIn("google", { redirectTo: "/" });
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
};

export default LoginForm;
