export interface IForm {
  _id?: string;
  userId?: string;
  title: string;
  description: string;
  formSchema: string;
  uiSchema?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  author: {
    username: string;
    email: string;
    _id: string;
  };
}

export interface IFormResponse {
  _id: string;
  data: any;
  createdAt: Date;
}

export type IFormsList = IForm[];

export type IIFormResponseList = IFormResponse[];
