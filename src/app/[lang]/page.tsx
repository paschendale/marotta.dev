import PortfolioItem from "@/components/portfolio-item";
import SocialLinks from "@/components/social-links";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ params: { lang } }: LangProps) {
  const intl = await getDictionary(lang);
  
  const skills = {
    frontend: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Cesium", "Three.JS", "Potree"],
    backend: ["Node.js", "Express.js", "Nest.js", "Python", "FastAPI", "Django", "PostgreSQL", "MongoDB"],
    geospatial: ["Mapbox", "OpenLayers", "Leaflet", "GeoServer", "PostGIS", "GDAL", "PDAL", "Entwine", "tippecanoe", "Geopandas"],
    tools: ["Docker", "Git", "Redis", "AWS", "Linux", "CI/CD", "GitOps", "n8n", "Argo Workflows", "Kubernetes", "Bare Metal Infrastructure", "Networking"]
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-10 max-w-full scroll-smooth">
      <div
        className="
        flex md:flex-row flex-col
        w-[90%] xl:w-[60%]
        justify-items-center justify-center
        gap-10
        animate-in fade-in duration-700"
      >
        <div className="flex flex-row align-middle justify-center h-full">
          <Image 
            src="/me.png" 
            alt="Victor Marotta - Full Stack Developer" 
            width={150} 
            height={150}
            sizes="150px"
            className="w-[150px] h-auto object-contain rounded-lg shadow-lg"
            priority
          />
        </div>
        <div className="w-[95%] flex flex-col gap-4">
          <h1 className="text-xl font-semibold">{intl["hello"]}</h1>
          <p className="text-foreground/90 leading-relaxed">
            {intl["home-text-1"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["home-text-2"]}
          </p>
          <p className="text-foreground/90 leading-relaxed">
            {intl["home-text-3"]}
          </p>
          <SocialLinks />
        </div>
      </div>

      {/* Skills Section */}
      <section 
        className="
        flex flex-col
        justify-items-center justify-center
        w-[90%] xl:w-[60%]
        gap-6
        mt-16
        animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300
      "
        aria-labelledby="skills-heading"
      >
        <h2 id="skills-heading" className="text-xl font-semibold text-center">
          {intl["skills-title"]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{intl["frontend"]}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{intl["backend"]}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{intl["geospatial"]}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.geospatial.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{intl["tools"]}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm transition-transform hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="
        flex flex-col
        justify-items-center justify-center
        w-[90%] xl:w-[60%]
        gap-10
        mt-16
        animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500
      "
        aria-labelledby="projects-heading"
      >
        <h2 id="projects-heading" className="text-xl font-semibold text-center">
          {intl["check-out-projects"]}
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <PortfolioItem
                title={intl["skyforest-title"]}
                description={intl["skyforest-intro"]}
                image={
                  <Image 
                    src="/skyforest-1.png" 
                    alt="Skyforest project showcase" 
                    width={600} 
                    height={400}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain rounded-lg"
                  />
                }
                link={`/${lang}/projects/skyforest`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-dragonfly-title"]}
                description={intl["project-dragonfly-description"]}
                image={
                  <Image 
                    src="/dragonfly-preview.png" 
                    alt="Dragonfly project showcase" 
                    width={600} 
                    height={400}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain rounded-lg"
                  />
                }
                link={`/${lang}/projects/dragonfly`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-geoserver-title"]}
                description={intl["project-geoserver-description"]}
                image={
                  <Image 
                    src="/geoserver-mobile-client-1.png" 
                    alt="Geoserver Mobile Client project showcase" 
                    width={600} 
                    height={400}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain rounded-lg"
                  />
                }
                link={`/${lang}/projects/geoserver-mobile-client`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-pointcloud-title"]}
                description={intl["project-pointcloud-description"]}
                image={
                  <Image 
                    src="/pointcloud-processing.png" 
                    alt="Point Cloud Publishing Automation project showcase" 
                    width={400} 
                    height={300}
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-contain rounded-lg max-w-[400px] mx-auto"
                  />
                }
                link={`/${lang}/projects/pointcloud-automation`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-territorial-title"]}
                description={intl["project-territorial-description"]}
                image={
                  <Image 
                    src="/territorial-maps.png" 
                    alt="Territorial Maps project showcase" 
                    width={400} 
                    height={300}
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-contain rounded-lg max-w-[400px] mx-auto"
                  />
                }
                link={`/${lang}/projects/territorial-maps`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-geo360-title"]}
                description={intl["project-geo360-description"]}
                image={
                  <Image 
                    src="/geo360-ladm-preview.png" 
                    alt="Geo360 LADM project showcase" 
                    width={400} 
                    height={300}
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-contain rounded-lg max-w-[400px] mx-auto"
                  />
                }
                link={`/${lang}/projects/geo360-ladm`}
              />
            </CarouselItem>
            <CarouselItem>
              <PortfolioItem
                title={intl["project-geoportal-itabirito-title"]}
                description={intl["project-geoportal-itabirito-description"]}
                image={
                  <Image 
                    src="/geoportal-itabirito-preview.png" 
                    alt="Geoportal Itabirito project showcase" 
                    width={600} 
                    height={400}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain rounded-lg"
                  />
                }
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Contact Section */}
      <section
        className="
        flex flex-col
        justify-items-center justify-center
        w-[90%] xl:w-[60%]
        gap-4
        mt-16 mb-10
        animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700
      "
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="text-xl font-semibold text-center">
          {intl["contact-title"]}
        </h2>
        <p className="text-center text-foreground/90">
          {intl["contact-text"]}
        </p>
        <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
          <Link
            href="mailto:victor@marotta.dev"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Send email to Victor Marotta"
          >
            {intl["email"]}
          </Link>
          <Link
            href="https://territorial.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Visit Territorial.dev consulting firm"
          >
            Territorial.dev
          </Link>
        </div>
      </section>
    </main>
  );
}
