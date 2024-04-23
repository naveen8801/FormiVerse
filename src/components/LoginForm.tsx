"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const { z } = require("zod");
import { loginFormSchema } from "@/validation/loginForm";
import { validateDataForZodSchema } from "@/helpers/zodValidator";

interface IFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props: any): React.ReactElement => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

  /**
   * Handles the form submission by validating the form data against a Zod schema.
   *
   */
  const handleSubmit = async () => {
    const { success, errors } = await validateDataForZodSchema(
      formData,
      loginFormSchema
    );
    console.log(success, errors);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-1/3">
      <Input
        value={formData.username}
        type="text"
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

export default LoginForm;
