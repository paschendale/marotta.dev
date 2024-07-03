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
