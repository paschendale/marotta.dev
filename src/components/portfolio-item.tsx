import { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PortfolioItem(props: {
  title: string;
  description: string;
  image: ReactNode;
  link?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
      <div className="flex flex-row align-top h-full transition-transform hover:scale-105">
        {props.image}
      </div>
      <div className="md:w-[50%] w-[95%] flex flex-col gap-4 justify-center">
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p className="text-foreground/90 leading-relaxed">{props.description}</p>
        {props.link && (
          <Link href={props.link}>
            <Button 
              variant={"outline"}
              className="transition-transform hover:scale-105 w-fit"
            >
              See more
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
