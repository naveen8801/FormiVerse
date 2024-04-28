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
import { LuPlusSquare } from "react-icons/lu";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Editor from "@monaco-editor/react";
import JsonSchemaForm from "./JsonSchemaForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface IProp {
  user: any;
}

const CreateFormWizard: React.FC<IProp> = (props): React.ReactElement => {
  const { user } = props;
  const DEFAULT_DATA = {
    title: "",
    description: "",
    formSchema: "",
    uiSchema: "",
    author: {
      username: user?.username,
      email: user?.email,
      _id: user?.id,
    },
  };
  const [open, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<IForm>(DEFAULT_DATA);

  /**
   * Handles the change event of the editor.
   *
   * @param {string | undefined} value - The new value of the editor.
   * @return {void} This function does not return anything.
   */
  const handleFormSchemaEditorChange = (value: string | undefined) => {
    if (value) {
      let formattedJSON = value;
      formattedJSON = JSON.stringify(JSON.parse(value), null, 4);
      try {
      } catch (error) {}
      setData((prev) => ({
        ...prev,
        formSchema: JSON.stringify(JSON.parse(formattedJSON), null, 4),
      }));
    }
  };

  const handleUISchemaEditorChange = (value: string | undefined) => {
    if (value) {
      let formattedJSON = value;
      formattedJSON = JSON.stringify(JSON.parse(value), null, 4);
      try {
      } catch (error) {}
      setData((prev) => ({
        ...prev,
        uiSchema: JSON.stringify(JSON.parse(formattedJSON), null, 4),
      }));
    }
  };

  const jsonSchema = useMemo(() => {
    try {
      return JSON.parse(data?.formSchema);
    } catch (error) {
      return {};
    }
  }, [data?.formSchema]);

  const uiSchema = useMemo(() => {
    try {
      if (data?.uiSchema) return JSON.parse(data?.uiSchema);
      return {};
    } catch (error) {
      return {};
    }
  }, [data?.uiSchema]);

  // List of steps
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

  // Content as per current step
  const content = useMemo(() => {
    const step = STEPS[currentStep];
    const header = (
      <DialogHeader>
        <DialogTitle>{step?.title}</DialogTitle>
        <DialogDescription>{step?.description}</DialogDescription>
      </DialogHeader>
    );

    if (currentStep === 0) {
      return (
        <div className="space-y-4">
          {header}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <Textarea
              rows={6}
              placeholder="Description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
        </div>
      );
    } else if (currentStep === 1) {
      return (
        <div className="space-y-4">
          {header}
          <div className="grid h-full gap-2 sm:grid-cols-1 xl:grid-cols-2">
            <div className="col-span-1 grid grid-rows-2 gap-2">
              <Card className="row-span-1 h-full">
                <CardHeader>
                  <CardTitle>Form Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <Editor
                    theme="vs-dark"
                    height="20vh"
                    className="w-full"
                    defaultLanguage="json"
                    value={data?.formSchema}
                    onChange={handleFormSchemaEditorChange}
                  />
                </CardContent>
              </Card>
              <Card className="row-span-1 h-full">
                <CardHeader>
                  <CardTitle>UI Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <Editor
                    height="20vh"
                    className="w-full"
                    theme="vs-dark"
                    defaultLanguage="json"
                    value={data?.uiSchema}
                    onChange={handleUISchemaEditorChange}
                  />
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-1 h-[90%] overflow-auto w-full">
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <JsonSchemaForm
                  disabled
                  schema={jsonSchema}
                  uiSchema={uiSchema}
                >
                  <></>
                </JsonSchemaForm>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className="">
          {header} <div></div>
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div className="">
          {header} <div></div>
        </div>
      );
    } else {
      return <></>;
    }
  }, [currentStep, data, jsonSchema, uiSchema]);

  // Footer as per current step
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

  // Handle close dialog
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
      <DialogContent className="min-w-full sm:min-w-full md:min-w-full xl:min-w-[1200px] overflow-y-scroll max-h-[90vh]">
        {content}
        {footer}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormWizard;
