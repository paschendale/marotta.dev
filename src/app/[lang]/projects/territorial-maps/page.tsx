import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function TerritorialMaps({ params: { lang } }: LangProps) {
  
  const intl = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <BackButton lang={lang} />
      <div className="flex flex-col lg:flex-row p-4 gap-8 mt-4">
        <div className="flex flex-col w-full md:w-[30%]">
          <h2 className="text-xl font-semibold">{ intl["showcase"] }</h2>
          <div className="flex flex-row lg:flex-col mt-7 gap-4 overflow-x-auto lg:overflow-visible">
            <Image 
              src="/territorial-maps.png" 
              alt="Territorial Maps platform interface"
              width={600}
              height={400}
              sizes="(max-width: 768px) 20vw, 300px"
              className="max-h-[30vh] max-w-[20vw] md:max-w-auto md:max-h-[40vh] md:w-auto h-auto object-contain rounded-lg shadow-md transition-transform hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <h1 className="text-xl font-semibold">{intl["project-territorial-title"]}</h1>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-territorial-description"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-territorial-intro"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-territorial-features"]}
          </p>
          <p className="font-semibold">
            {intl["project-territorial-technologies"]}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <h2 className="text-xl font-semibold">{intl["links"]}</h2>
          <Link
            href="https://app.territorial.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
          >
            <Button 
              variant="link"
              className="transition-transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M8 23q-.825 0-1.412-.587T6 21v-4h2v1h10V6H8v1H6V3q0-.825.588-1.412T8 1h10q.825 0 1.413.588T20 3v18q0 .825-.587 1.413T18 23zm-3.6-6L3 15.6L8.6 10H5V8h7v7h-2v-3.6z"
                />
              </svg>
              &nbsp; &nbsp;
              <span>app.territorial.dev</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

