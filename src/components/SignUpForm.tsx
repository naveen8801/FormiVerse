"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const { z } = require("zod");
import { signUpFormSchema } from "@/validation/signUpForm";
import { validateDataForZodSchema } from "@/helpers/zodValidator";
import toast from "react-hot-toast";

interface IFormData {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = (): React.ReactElement => {
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
    const { success, errors } = await validateDataForZodSchema(
      formData,
      signUpFormSchema
    );
    if (!success) {
      let messages = errors?.map((e) => e.message);
      toast.error(messages?.join(", "));
    }
    console.log(success, errors);
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
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export default SignUpForm;
