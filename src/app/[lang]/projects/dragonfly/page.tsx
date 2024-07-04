import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Link from "next/link";

const images = [
  "/dragonfly-1.png",
  // "/dragonfly-2.png",
  // "/dragonfly-3.png",
  "/dragonfly-4.png",
  "/dragonfly-5.png",
];

export default async function Dragonfly({ params: { lang } }: LangProps) {
  
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

          <img src={images[0]} className="flex lg:hidden  mt-7" />

          {/*  */}
          <div className="hidden lg:flex flex-col mt-7 gap-4">
            {images.map((e, i) => (
              <img src={e} key={i} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-[40%]">
          <p className="text-xl font-semibold">{intl["project-dragonfly"]}</p>

          <p>{intl["project-dragonfly-intro"]}</p>
          
          <p>{intl["project-dragonfly-dev"]}</p>
          
          <p>{intl["project-dragonfly-frontend"]}</p>
          
          <p>{intl["project-dragonfly-backend"]}</p>
          
          <p>{intl["project-dragonfly-mobile"]}</p>
          
          <p>{intl["project-dragonfly-contract"]}</p>
          
          <p>{intl["project-dragonfly-deployment"]}</p>
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <p className="text-xl font-semibold">{intl["links"]}</p>
          <Link
            href="https://github.com/paschendale/libelula"
            target="_blank"
            className=" mt-6"
          >
            <Button variant="link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                  clip-rule="evenodd"
                />
              </svg>
              &nbsp; &nbsp;
              <span>paschendale/libelula</span>
            </Button>
          </Link>
          <Link
            href="https://github.com/paschendale/libelula-api"
            target="_blank"
          >
            <Button variant="link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                  clip-rule="evenodd"
                />
              </svg>
              &nbsp; &nbsp;
              <span>paschendale/libelula-api</span>
            </Button>
          </Link>
          <Link
            href="https://github.com/paschendale/user-management"
            target="_blank"
          >
            <Button variant="link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                  clip-rule="evenodd"
                />
              </svg>
              &nbsp; &nbsp;
              <span>paschendale/user-management</span>
            </Button>
          </Link>
          <Link href="https://libelula.marotta.dev" target="_blank">
            <Button variant="link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 23q-.825 0-1.412-.587T6 21v-4h2v1h10V6H8v1H6V3q0-.825.588-1.412T8 1h10q.825 0 1.413.588T20 3v18q0 .825-.587 1.413T18 23zm-3.6-6L3 15.6L8.6 10H5V8h7v7h-2v-3.6z"
                />
              </svg>
              &nbsp; &nbsp;
              <span>libelula.marotta.dev</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
