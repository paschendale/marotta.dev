import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Link from "next/link";

const images = [
  "/skyforest-1.png",
  "/skyforest-2.png",
  "/skyforest-3.png",
];

export default async function Skyforest({ params: { lang } }: LangProps) {
  
  const intl = await getDictionary(lang);

  return (
    <div className="flex flex-col">
      <Link href={"/" + lang}>
        <Button variant={"link"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
            ></path>
          </svg>
          <span>{ intl["go-back"] }</span>
        </Button>
      </Link>
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex flex-col w-full md:w-[30%]">
          <p className="text-xl font-semibold">{ intl["showcase"] }</p>

          <div className="flex flex-row lg:flex-wrap mt-7 gap-4">
            {images.map((e, i) => (
              <img className="max-h-[30vh] max-w-[20vw] md:max-w-auto md:max-h-[40vh] md:w-auto h-auto object-contain" src={e} key={i} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <p className="text-xl font-semibold">{intl["skyforest-title"]}</p>
          <p>{intl["skyforest-intro"]}</p>
          <p>{intl["skyforest-solution"]}</p>
          <p>{intl["skyforest-interface"]}</p>
          <p>{intl["skyforest-impact"]}</p>
          <p>{intl["skyforest-conclusion"]}</p>
          <p><strong>{intl["skyforest-technologies"]}</strong></p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <p className="text-xl font-semibold">{intl["links"]}</p>
          <Link
            href="https://map.skyforest.se"
            target="_blank"
            className=" mt-6"
          >
            <Button variant="link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="currentColor" d="M26 28H6a2.003 2.003 0 0 1-2-2V6a2.003 2.003 0 0 1 2-2h10v2H6v20h20V16h2v10a2.003 2.003 0 0 1-2 2"/><path fill="currentColor" d="M20 2v2h6.586L18 12.586L19.414 14L28 5.414V12h2V2z"/></svg>
              &nbsp; &nbsp;
              <span>System's Home Page</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
