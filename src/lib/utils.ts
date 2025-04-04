import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateScriptEmbedCodeForForm = (formId: string) => {
  return `<script
        async
        src="${process.env.NEXT_PUBLIC_APP_URL!}/magical-script.js"
        data-form-id="${formId}"
        data-trigger-element-id="formiverse-form" 
        data-popup-header="Contact Me"
        data-popup-height="550"
      ></script>`;
};
