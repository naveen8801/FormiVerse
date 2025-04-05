import { ClientOnly } from "@/components/ClientOnly";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "AI & JSON Schema Form Builder",
      description:
        "Generate forms in seconds using AI or drop in a JSON Schema — validation, structure, and logic handled for you.",
    },
    {
      title: "Create & Integrate in 3 Simple Steps",
      description:
        "Build a form and embed it — all in under 2 minutes. No complex setup or code required.",
    },
    {
      title: "Embed with Script Tag",
      description:
        "Easily embed forms into any website using a simple <script> tag — just copy, paste, and you're live.",
    },
    {
      title: "Real-time Response Viewer",
      description:
        "Watch responses roll in live — no refresh needed. Get insights the moment users submit your forms.",
    },
    {
      title: "Instant Email Notifications",
      description:
        "Get notified the moment someone submits a response. Stay in the loop without checking the dashboard.",
    },
    {
      title: "Export to PDF & CSV",
      description:
        "Download all responses in neatly formatted PDFs or spreadsheets — perfect for reports and backups.",
    },
  ];

  return (
    <div className="w-full h-full">
      <SparklesText
        className="mt-10 text-center "
        text={
          <div className="text-center text-4xl lg:text-6xl">
            <span className="text-primaryColor">Formi</span>
            <span>Verse</span>
          </div>
        }
      />
      <p className="w-full text-center text-xl flex flex-col items-center justify-center lg:gap-2 md:gap-2 lg:h-10 md:h-10 md:flex-row lg:flex-row md:text-2xl lg:text-4xl mt-5">
        Now form
        <span className="m-0 p-0 text-primaryColor">
          <ClientOnly>
            <WordRotate words={["creation", "management", "analysis"]} />
          </ClientOnly>
        </span>
        becomes very easy.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 md:w-1/2 gap-4 text-center m-auto mt-20">
        {features.map((feature, index) => (
          <Card
            className="relative p-4 flex flex-col gap-2 items-center justify-center"
            key={index}
          >
            <span className="inline-block text-neutral-800 dark:text-neutral-100">
              {feature?.title}
            </span>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {feature?.description}
            </p>
            <BorderBeam duration={8} size={100} />
          </Card>
        ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild>
          <Link href="/login">Get Started 🚀</Link>
        </Button>
      </div>
    </div>
  );
}
