"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface IFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props: any): React.ReactElement => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

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
        value={formData.username}
        type="password"
        placeholder="Password"
        onChange={({ target }) => {
          setFormData({ ...formData, password: target.value });
        }}
      />
      <Button>Login</Button>
    </div>
  );
};

export default LoginForm;
