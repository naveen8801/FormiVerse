import { ClientOnly } from "@/components/ClientOnly";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { WordRotate } from "@/components/magicui/word-rotate";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <SparklesText
        text={
          <div className="text-center text-4xl lg:text-6xl">
            <span className="text-primaryColor">Formi</span>
            <span>Verse</span>
          </div>
        }
      />
      <p className="w-full text-center text-xl flex flex-col items-center justify-center lg:gap-2 md:gap-2 lg:h-10 md:h-10 md:flex-row lg:flex-row md:text-2xl lg:text-4xl">
        Now form
        <span className="m-0 p-0 text-primaryColor">
          <ClientOnly>
            <WordRotate words={["creation", "management", "analysis"]} />
          </ClientOnly>
        </span>
        becomes very easy.
      </p>
    </div>
  );
}
