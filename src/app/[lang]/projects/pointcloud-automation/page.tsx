import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function PointCloudAutomation({ params: { lang } }: LangProps) {
  
  const intl = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-10 animate-in fade-in duration-700">
      <BackButton lang={lang} />
      <div className="flex flex-col lg:flex-row p-4 gap-8 mt-4">
        <div className="flex flex-col w-full md:w-[30%]">
          <h2 className="text-xl font-semibold">{ intl["showcase"] }</h2>
          <div className="flex flex-row lg:flex-col mt-7 gap-4 overflow-x-auto lg:overflow-visible">
            <Image 
              src="/pointcloud-processing.png" 
              alt="Point Cloud Processing workflow in n8n"
              width={600}
              height={400}
              sizes="(max-width: 768px) 20vw, 300px"
              className="max-h-[30vh] max-w-[20vw] md:max-w-auto md:max-h-[40vh] md:w-auto h-auto object-contain rounded-lg shadow-md transition-transform hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <h1 className="text-xl font-semibold">{intl["project-pointcloud-title"]}</h1>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-pointcloud-description"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-pointcloud-intro"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["project-pointcloud-features"]}
          </p>
          <p className="font-semibold">
            {intl["project-pointcloud-technologies"]}
          </p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <h2 className="text-xl font-semibold">{intl["links"]}</h2>
        </div>
      </div>
    </div>
  );
}

