export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div
        className="
        flex md:flex-row flex-col
        w-[90%] md:w-[90%]
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
      {/* <div className="flex">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              ...
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              ...
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              ...
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </main>
  );
}
