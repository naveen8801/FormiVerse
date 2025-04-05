"use client";

import { IProfileFormProp } from "@/types";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { validateDataForZodSchema } from "@/helpers/zodValidator";
import { handleUpdateUserProfile } from "@/actions/authActions";
import { profileFormSchema } from "@/validation/profileForm";

const ProfileForm: React.FC<IProfileFormProp> = (props) => {
  const { userData } = props;
  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
    fullname: string;
  }>({
    password: "",
    confirmPassword: "",
    fullname: userData?.fullname || "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handles the form submission by validating the form data against a Zod schema.
   *
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    const { success, errors } = await validateDataForZodSchema(
      formData,
      profileFormSchema
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

    const { data, error } = await handleUpdateUserProfile(userData.id, {
      fullname: formData.fullname,
      password: formData.password,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
      setIsLoading(false);
      return;
    }
    if (data) {
      toast({
        variant: "default",
        title: "Success",
        description: "Details updated successfully",
      });
      setFormData({
        fullname: data?.fullname,
        password: "",
        confirmPassword: "",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid gap-2">
        <Label>Username</Label>
        <Input
          disabled
          value={userData.username}
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input
          disabled
          value={userData.email}
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="grid gap-2">
        <Label>Full Name</Label>
        <Input
          value={formData.fullname}
          type="text"
          placeholder="Full name"
          onChange={({ target }) => {
            setFormData({ ...formData, fullname: target.value });
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label>Password</Label>
        <Input
          value={formData.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) => {
            setFormData({ ...formData, password: target.value });
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label>Confirm Password</Label>
        <Input
          value={formData.confirmPassword}
          type="password"
          placeholder="Confirm Password"
          onChange={({ target }) => {
            setFormData({ ...formData, confirmPassword: target.value });
          }}
        />
      </div>
      <Button
        disabled={isLoading}
        onClick={() => {
          handleSubmit();
        }}
      >
        Update
      </Button>
    </div>
  );
};

export default ProfileForm;
