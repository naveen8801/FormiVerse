"use client";

import * as React from "react";
import {
  FaCheck as Check,
  FaChevronRight as ChevronRight,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  stepNumber?: number;
}

const Step: React.FC<StepProps> = ({
  title,
  isCompleted,
  isActive,
  stepNumber,
}) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : isActive
              ? "border-primary"
              : "border-muted"
          )}
        >
          {isCompleted ? (
            <Check className="w-3 h-3" />
          ) : (
            <span className="text-sm font-bold">{stepNumber}</span>
          )}
        </div>
      </div>
      <div className="hidden invisible md:visible md:block">
        {title && <p className="text-sm text-muted-foreground">{title}</p>}
      </div>
    </div>
  );
};

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepChange: (step: number) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  children,
  disabled,
}: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <Step
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              stepNumber={index + 1}
            />
            {index < steps.length - 1 && (
              <ChevronRight className="text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>
      {children}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        {currentStep !== steps.length - 1 && (
          <Button
            onClick={() => onStepChange(currentStep + 1)}
            disabled={disabled}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
