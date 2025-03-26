import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateIFrameEmbedCodeForForm = (formId: string) => {
  return `<iframe width="500px" height="700px" src="${process.env
    .NEXT_PUBLIC_APP_URL!}/forms/${formId}" title="FormiVerse"></iframe>`;
};

export const generateScriptEmbedCodeForForm = (formId: string) => {
  return `<Script
        strategy="lazyOnload"
        src="${process.env.NEXT_PUBLIC_APP_URL!}/magical-script.js"
        data-form-id="${formId}"
        data-trigger-element-id="formiverse-form" // Pass id of HTML element which will act as a trigger to popup
        data-popup-header="Contact Me" // Pass header to popup - Optional
        data-popup-height="550" // Pass height to popup - Optional
      />`;
};
