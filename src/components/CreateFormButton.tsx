import React from "react";
import { LuPlusSquare } from "react-icons/lu";
import { Button } from "./ui/button";

const CreateFormButton: React.FC = (): React.ReactElement => {
  return (
    <Button variant="default">
      <LuPlusSquare size={18} className="mr-2" />
      Create Form
    </Button>
  );
};

export default CreateFormButton;
