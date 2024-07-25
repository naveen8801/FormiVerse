import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateEmbedCodeForForm = (userId: string, formId: string) => {
  return `<iframe width="500px" height="700px" src="${process.env
    .NEXT_PUBLIC_APP_URL!}/forms/${formId}?userId=${userId}" title="FormiVerse"></iframe>`;
};
