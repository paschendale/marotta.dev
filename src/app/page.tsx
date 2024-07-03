"use client";

import PortfolioItem from "@/components/portfolio-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-10 max-w-full">
      <div
        className="
        flex md:flex-row flex-col
        w-[90%] xl:w-[60%]
        justify-items-center justify-center
        gap-10"
      >
        <div className="flex flex-row align-top h-full">
          <img src="me.png" className="w-[150px] object-contain" />
        </div>
        <div className="md:w-[50%] w-[95%] flex flex-col gap-4">
          <p className="text-xl font-semibold">Hello, I'm Victor</p>
          <p>
            I'm a full stack developer specializing in geotechnologies. I have
            extensive experience with major frontend development tools like
            React, Angular, TypeScript, and Next.js. I'm also proficient in map
            libraries such as Mapbox, OpenLayers, and Leaflet, and have worked
            with a variety of backend frameworks including Spring, Play
            Framework, Django, Express.js, and Nest.js{" "}
          </p>
          <p>
            I graduated with a degree in Surveying and Cartographic Engineering
            in Universidade Federal de Viçosa, hold a Master's degree in Civil
            Engineering with a focus on Spatial Information, and I'm currently
            pursuing a Ph.D. in Civil Engineering, also focusing on Spatial
            Information{" "}
          </p>
          <p>
            {" "}
            Right now, I'm working as a requirements analyst at a cartographic
            engineering company in Brazil, but I'm open to freelancing
            opportunities both in Brazil and abroad
          </p>
          <div className="flex flex-row gap-3">
            <span
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.upwork.com/freelancers/~0147000a5df1523439",
                  "_blank",
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="32"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M56 32h336c30.9 0 56 25.1 56 56v336c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56V88c0-30.9 25.1-56 56-56m214.9 242.2c6.6-52.9 25.9-69.5 51.4-69.5c25.3 0 44.9 20.2 44.9 49.7s-19.7 49.7-44.9 49.7c-27.9 0-46.3-21.5-51.4-29.9m-26.7-41.8c-8.2-15.5-14.3-36.3-19.2-55.6h-62.9v78.1c0 28.4-12.9 49.4-38.2 49.4S84.1 283.4 84.1 255l.3-78.1H48.2V255c0 22.8 7.4 43.5 20.9 58.2c13.9 15.2 32.8 23.2 54.8 23.2c43.7 0 74.2-33.5 74.2-81.5v-52.5c4.6 17.3 15.4 50.5 36.2 79.7L215 392.6h36.8l12.8-78.4c4.2 3.5 8.7 6.6 13.4 9.4c12.3 7.8 26.4 12.2 40.9 12.6h3.4c45.1 0 80.9-34.9 80.9-81.9s-35.9-82.2-80.9-82.2c-45.4 0-70.9 29.7-78.1 60.1z"
                />
              </svg>
            </span>
            <span
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/victor-marotta-5055ab60/",
                  "_blank",
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M1 2.838A1.838 1.838 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.838 1.838 0 0 1 21.161 23H2.838A1.838 1.838 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span
              className="cursor-pointer"
              onClick={() =>
                window.open("https://github.com/paschendale", "_blank")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91c.575.101.79-.244.79-.546c0-.273-.014-1.178-.014-2.142c-2.889.532-3.636-.704-3.866-1.35c-.13-.331-.69-1.352-1.18-1.625c-.402-.216-.977-.748-.014-.762c.906-.014 1.553.834 1.769 1.179c1.035 1.74 2.688 1.25 3.349.948c.1-.747.402-1.25.733-1.538c-2.559-.287-5.232-1.279-5.232-5.678c0-1.25.445-2.285 1.178-3.09c-.115-.288-.517-1.467.115-3.048c0 0 .963-.302 3.163 1.179c.92-.259 1.897-.388 2.875-.388c.977 0 1.955.13 2.875.388c2.2-1.495 3.162-1.179 3.162-1.179c.633 1.581.23 2.76.115 3.048c.733.805 1.179 1.825 1.179 3.09c0 4.413-2.688 5.39-5.247 5.678c.417.36.776 1.05.776 2.128c0 1.538-.014 2.774-.014 3.162c0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25C24 5.896 18.854.75 12.5.75"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div
        className="
        flex flex-col
        justify-items-center justify-center
        w-[80%] md:w-[80%]
        gap-10
      "
      >
        <p
          className="
          text-xl font-semibold
          w-full
          text-center
          mt-10
        "
        >
          Checkout my latest projects
        </p>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <PortfolioItem
                title="Dragonfly"
                description="Dragonfly is a geointelligence platform focused on combating arboviruses endemic to Brazil, such as dengue, Zika, and chikungunya"
                image={<img src="dragonfly-preview.png" />}
                link="/projects/dragonfly"
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title="Geoportal Itabirito"
                description="The Geoportal Itabirito is an innovative platform that consolidates data from the Multipurpose Territorial Cadastre of the municipality of Itabirito"
                image={<img src="geoportal-itabirito-preview.png" />}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
