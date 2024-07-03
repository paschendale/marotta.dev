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
    <div className="flex flex-col lg:flex-row gap-4 justify-center">
      <div className="flex flex-row align-top h-full">{props.image}</div>
      <div className="md:w-[50%] w-[95%] flex flex-col gap-4 justify-center">
        <p className="text-xl font-semibold">{props.title}</p>
        <p>{props.description}</p>
        {props.link && (
          <Link href={props.link}>
            <Button variant={"outline"}>See more</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
