import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/geoserver-mobile-client-2.png",
  "/geoserver-mobile-client-3.png",
  "/geoserver-mobile-client-4.png",
  "/geoserver-mobile-client-5.png",
];

export default async function GeoserverMobileClient({ params: { lang } }: LangProps) {
  
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
                alt={`Geoserver Mobile Client screenshot ${i + 1}`}
                width={600}
                height={400}
                sizes="(max-width: 768px) 20vw, 300px"
                className="max-h-[30vh] max-w-[20vw] md:max-w-auto md:max-h-[40vh] md:w-auto h-auto object-contain rounded-lg shadow-md transition-transform hover:scale-105"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <h1 className="text-xl font-semibold">{intl["project-geoserver-title"]}</h1>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-intro"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-dev"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-frontend"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-backend"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-mobile"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-contract"]}</p>

          <p className="text-foreground/90 leading-relaxed">{intl["project-geoserver-deployment"]}</p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <h2 className="text-xl font-semibold">{intl["links"]}</h2>
          <Link
            href="https://github.com/paschendale/geoserver-mobile-client"
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
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp; &nbsp;
              <span>paschendale/geoserver-mobile-client</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
