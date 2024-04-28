"use client";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { IForm } from "@/types";
import CreateFormButton from "./CreateFormButton";
import { LuPlusSquare } from "react-icons/lu";

interface IProp {
  user: any;
}

const CreateFormWizard: React.FC<IProp> = (props): React.ReactElement => {
  const { user } = props;
  const DEFAULT_DATA = {
    title: "",
    description: "",
    tags: [],
    formSchema: "",
    author: {
      username: user?.username,
      email: user?.email,
      _id: user?.id,
    },
  };
  const [open, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<IForm>(DEFAULT_DATA);

  const STEPS = [
    {
      id: 0,
      title: "Form Meta",
      description: "Define meta information of form you want to create.",
    },
    {
      id: 1,
      title: "Create Form",
      description:
        "Input form JSON Schema inside below editor to create your form and preview it at the same time.",
    },
    {
      id: 2,
      title: "Form Integration",
      description:
        "Copy & paste this snippet to integrate created form into your website",
    },
    {
      id: 3,
      title: "Let's Go 🚀",
      description:
        "You have successfully created your form. You can see form details and responses by accessing it from dashboard",
    },
  ];

  const content = useMemo(() => {
    const step = STEPS[currentStep];
    const header = (
      <DialogHeader>
        <DialogTitle>{step?.title}</DialogTitle>
        <DialogDescription>{step?.description}</DialogDescription>
      </DialogHeader>
    );

    if (currentStep === 0) {
      return <div>{header}</div>;
    } else if (currentStep === 1) {
      return <div>{header}</div>;
    } else if (currentStep === 2) {
      return <div>{header}</div>;
    } else if (currentStep === 3) {
      return <div>{header}</div>;
    } else {
      return <></>;
    }
  }, [currentStep]);

  const footer = useMemo(() => {
    if (currentStep === 0) {
      return (
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next
          </Button>
        </DialogFooter>
      );
    }
    if (currentStep === 1) {
      return (
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </Button>
          <Button
            variant="default"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Create Form & Next
          </Button>
        </DialogFooter>
      );
    }
    if (currentStep === 2) {
      return (
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next
          </Button>
        </DialogFooter>
      );
    }
    if (currentStep === 3) {
      return (
        <DialogFooter>
          <Button variant="default" onClick={() => handleClose(false)}>
            Done 🚀
          </Button>
        </DialogFooter>
      );
    }
  }, [currentStep]);

  const handleClose = (isOpen: boolean) => {
    if (open === false) {
      setCurrentStep(0);
      setData(DEFAULT_DATA);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="default">
          <LuPlusSquare size={18} className="mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full sm:min-w-full md:min-w-full xl:min-w-[1200px]">
        {content}
        {footer}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormWizard;
