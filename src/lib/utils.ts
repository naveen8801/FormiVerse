import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateScriptEmbedCodeForForm = (formId: string) => {
  return `
  <script 
    async 
    src="${process.env.NEXT_PUBLIC_APP_URL!}/magical-script.js" 
    data-form-id="${formId}" 
    data-trigger-element-id="formiverse-form" 
    data-popup-height="550">
  </script>
  `;
};

export function generateUsername(name: string) {
  // Clean and split the name
  const cleanName = name.toLowerCase().trim();
  const nameParts = cleanName.split(" ");

  // Arrays of elements to combine with the name
  const prefixes = [
    "cool",
    "awesome",
    "super",
    "mega",
    "ultra",
    "pro",
    "ninja",
    "cosmic",
    "epic",
    "hyper",
  ];
  const suffixes = [
    "coder",
    "dev",
    "hacker",
    "guru",
    "master",
    "wizard",
    "star",
    "hero",
    "genius",
    "phoenix",
  ];
  const numbers = Array.from({ length: 100 }, (_, i) => i);

  // Get random elements
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  // Generate different username options
  const options = [
    `${nameParts[0]}${randomNumber}`,
    `${randomPrefix}${
      nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
    }`,
    `${nameParts[0]}${randomSuffix}`,
    `${randomPrefix}${nameParts[0]}${randomNumber}`,
    `${nameParts[0]}_${randomSuffix}${randomNumber}`,
  ];

  // Return a random option
  return options[Math.floor(Math.random() * options.length)];
}
