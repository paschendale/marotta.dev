import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/skyforest-1.png",
  "/skyforest-2.png",
  "/skyforest-3.png",
];

export default async function Skyforest({ params: { lang } }: LangProps) {
  
  const intl = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <BackButton lang={lang} />
      <div className="flex flex-col lg:flex-row p-4 gap-8 mt-4">
        <div className="flex flex-col w-full md:w-[30%]">
          <h2 className="text-xl font-semibold">{ intl["showcase"] }</h2>

          <div className="flex flex-row lg:flex-col mt-7 gap-4 overflow-x-auto lg:overflow-visible">
            {images.map((e, i) => (
              <Image 
                key={i}
                src={e} 
                alt={`Skyforest project screenshot ${i + 1}`}
                width={600}
                height={400}
                sizes="(max-width: 768px) 20vw, 300px"
                className="max-h-[30vh] max-w-[20vw] md:max-w-auto md:max-h-[40vh] md:w-auto h-auto object-contain rounded-lg shadow-md transition-transform hover:scale-105"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <h1 className="text-xl font-semibold">{intl["skyforest-title"]}</h1>
          <p className="text-foreground/90 leading-relaxed">{intl["skyforest-intro"]}</p>
          <p className="text-foreground/90 leading-relaxed">{intl["skyforest-solution"]}</p>
          <p className="text-foreground/90 leading-relaxed">{intl["skyforest-interface"]}</p>
          <p className="text-foreground/90 leading-relaxed">{intl["skyforest-impact"]}</p>
          <p className="text-foreground/90 leading-relaxed">{intl["skyforest-conclusion"]}</p>
          <p className="font-semibold">{intl["skyforest-technologies"]}</p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <h2 className="text-xl font-semibold">{intl["links"]}</h2>
          <Link
            href="https://map.skyforest.se"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6"
          >
            <Button 
              variant="link"
              className="transition-transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M26 28H6a2.003 2.003 0 0 1-2-2V6a2.003 2.003 0 0 1 2-2h10v2H6v20h20V16h2v10a2.003 2.003 0 0 1-2 2"/><path fill="currentColor" d="M20 2v2h6.586L18 12.586L19.414 14L28 5.414V12h2V2z"/></svg>
              &nbsp; &nbsp;
              <span>System's Home Page</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
