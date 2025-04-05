"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const { z } = require("zod");
import { signUpFormSchema } from "@/validation/signUpForm";
import { validateDataForZodSchema } from "@/helpers/zodValidator";
import { useToast } from "@/components/ui/use-toast";
import { handleUserSignUp } from "@/actions/authActions";

interface IFormData {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = (): React.ReactElement => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    fullname: "",
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
      signUpFormSchema
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
    const { msg, error } = await handleUserSignUp(formData);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      setIsLoading(false);
      return;
    }
    if (msg) {
      toast({
        variant: "default",
        title: "Success",
        description: msg,
      });
      setFormData({
        username: "",
        email: "",
        fullname: "",
        password: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-1/3">
      <div className="space-y-2">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter following details to create your account.
        </p>
      </div>
      <Input
        value={formData.fullname}
        type="text"
        placeholder="Fullname"
        onChange={({ target }) => {
          setFormData({ ...formData, fullname: target.value });
        }}
      />
      <Input
        value={formData.email}
        type="email"
        placeholder="Email"
        onChange={({ target }) => {
          setFormData({ ...formData, email: target.value });
        }}
      />
      <Input
        value={formData.username}
        type="email"
        placeholder="Username"
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
        Sign Up
      </Button>
    </div>
  );
};

export default SignUpForm;
