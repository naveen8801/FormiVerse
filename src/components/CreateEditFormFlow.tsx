"use client";
import React, { useMemo, useState } from "react";
import { Stepper } from "./ui/stepper";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Editor from "@monaco-editor/react";
import JsonSchemaForm from "./JsonSchemaForm";
import { toast } from "./ui/use-toast";
import { Base64 } from "js-base64";
import { validateDataForZodSchema } from "@/helpers/zodValidator";
import { formSchema } from "@/validation/form";
import { generateScriptEmbedCodeForForm } from "@/lib/utils";
import { ScriptCopyBtn } from "./magicui/script-copy-btn";
import { IForm } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { handleCreateForm } from "@/actions/formActions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { FaCircleInfo } from "react-icons/fa6";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import Link from "next/link";

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
      "Copy & paste this snippet to integrate you form just created into your website",
  },
];

interface IProp {
  user: any;
}

const CreateEditFormFlow: React.FC<IProp> = (props) => {
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
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<IForm>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFormCreation = async (data_: IForm) => {
    setIsLoading(true);
    let payload = { ...data_ };

    // Base64 encode
    if (payload?.formSchema) {
      payload.formSchema = Base64.encode(payload.formSchema);
    }
    // Base64 encode
    if (payload?.uiSchema) {
      payload.uiSchema = Base64.encode(payload.uiSchema);
    }
    const { success, errors } = await validateDataForZodSchema(
      payload,
      formSchema
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

    const { data, error } = await handleCreateForm(payload);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.toString(),
      });
    }
    if (data) {
      setData((prev) => {
        return {
          ...prev,
          _id: data?._id,
        };
      });
      toast({
        variant: "default",
        title: "Success",
        description: "Form created successfully !",
      });
      setCurrentStep((prev) => prev + 1);
    }
    setIsLoading(false);
  };

  const handleStepChange = (id: number) => {
    if (id === 2) {
      handleFormCreation(data);
    } else {
      setCurrentStep(id);
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

  // Content as per current step
  const content = useMemo(() => {
    const step = STEPS[currentStep];
    const header = (
      <Alert variant="default">
        <FaCircleInfo />
        <AlertTitle>{step?.title}</AlertTitle>
        <AlertDescription>{step?.description}</AlertDescription>
      </Alert>
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
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <div className="h-full p-4">
                    <h2>Form Schema</h2>
                    <Editor
                      theme="vs-dark"
                      className="w-full h-full"
                      defaultLanguage="json"
                      value={data?.formSchema}
                      onChange={handleFormSchemaEditorChange}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="h-full p-4">
                    <h2>UI Schema</h2>
                    <Editor
                      className="w-full h-full"
                      theme="vs-dark"
                      defaultLanguage="json"
                      value={data?.uiSchema}
                      onChange={handleUISchemaEditorChange}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="h-[calc(100vh-500px)] p-4">
                <h2>Form Preview</h2>
                <JsonSchemaForm
                  disabled
                  schema={jsonSchema}
                  uiSchema={uiSchema}
                >
                  <></>
                </JsonSchemaForm>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className="space-y-4 w-full">
          {header}
          <div className="w-full">
            <ScriptCopyBtn
              className="w-[100%] text-sm"
              showMultiplePackageOptions={false}
              codeLanguage="html"
              lightTheme="slack-dark"
              darkTheme="slack-dark"
              commandMap={{ html: generateScriptEmbedCodeForForm(data?._id!) }}
            />
          </div>
          <p>
            You created a form successfully. Visit your{" "}
            <Link href={"/dashboard"} className="underline">
              dashboard
            </Link>{" "}
            to view all your forms
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  }, [currentStep, data, jsonSchema, uiSchema]);

  return (
    <div className="w-full h-full">
      <Stepper
        disabled={isLoading}
        steps={STEPS}
        currentStep={currentStep}
        onStepChange={(id) => {
          handleStepChange(id);
        }}
      >
        {content}
      </Stepper>
    </div>
  );
};

export default CreateEditFormFlow;
