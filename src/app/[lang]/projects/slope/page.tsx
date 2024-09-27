// Interactive Geospatial Data Visualization Prototype

// I recently developed an interactive geospatial data visualization prototype that integrates advanced mapping functionalities with a responsive frontend and a robust backend API. This project showcases my proficiency in modern web development technologies, spatial databases, and user-centric design.

// Overview

// The prototype is a web application that allows users to interact with a map interface, draw lines representing paths or profiles, and retrieve elevation data along those lines. This functionality is particularly useful for applications in geographic information systems (GIS), environmental studies, urban planning, and any field that requires elevation profiling.

// Frontend Implementation

// The frontend is built using Next.js and React, ensuring optimal performance through server-side rendering and seamless client-side navigation. The map interface utilizes the rlayers library, a React wrapper for OpenLayers, to provide an interactive and intuitive user experience. Users can draw lines directly on the map, which then serve as input for generating elevation profiles.

// I employed Tailwind CSS for styling to ensure a responsive and modern design. The layout is split into two main sections: one for the map interface and another for displaying the elevation profile or additional information. Flexbox and responsive units were used to make the application adaptable to different screen sizes.

// Backend API Development

// The backend is implemented as a Next.js API route, leveraging serverless functions for efficient request handling. Instead of using an ORM like Prisma, I opted for the pg module to interact directly with a PostgreSQL database enhanced with PostGIS for spatial data operations. This decision was made to optimize performance and have finer control over the SQL queries, especially when dealing with complex spatial queries.

// The API endpoint processes the line coordinates provided by the frontend, performs spatial queries to extract elevation data along the line, and returns this data in a structured format. To prevent SQL injection and ensure security, I used parameterized queries and input validation, especially when dealing with dynamic table names and arrays.

// Database Interaction and Spatial Queries

// Using PostgreSQL with the PostGIS extension allowed for advanced spatial data handling. The database contains raster data representing elevation models. The API performs queries to:

// Retrieve the minimum pixel width of the raster data to determine resolution.
// Generate a series of points along the user-drawn line at intervals matching the raster resolution.
// Interpolate these points to extract the corresponding elevation values from the raster data.
// This approach ensures accurate and efficient retrieval of elevation data, essential for generating precise elevation profiles.

// Security and Performance Considerations

// Security was a paramount concern throughout development. I implemented token-based authentication by checking the Authorization header in API requests. Sensitive information like tokens and database connection strings are stored securely in environment variables.

// To prevent SQL injection attacks, I used the pg-format library to safely construct SQL queries with dynamic parameters. Additionally, I whitelisted acceptable table names and performed thorough input validation.

// Performance optimizations included efficient handling of database connections and minimizing the data transferred between the server and client. By using Next.js API routes and serverless functions, the application scales effectively under varying loads.

// Challenges and Solutions

// One of the challenges was integrating complex spatial SQL queries within a Next.js API route using the pg module. To address this, I carefully constructed queries using pg-format to handle dynamic inputs securely. Ensuring the frontend and backend communicated effectively required precise handling of data serialization and deserialization, especially with geospatial data formats like GeoJSON.

// Conclusion

// This prototype demonstrates my ability to build full-stack applications that handle complex data and provide intuitive user experiences. By integrating advanced geospatial querying with interactive frontend components, the application serves as a solid foundation for more extensive GIS applications or any project requiring spatial data visualization and analysis.

// This project not only highlights my technical skills in React, Next.js, PostgreSQL, and spatial databases but also my attention to security, performance, and user-centric design principles.

// Technologies Used

// Frontend: Next.js, React, rlayers (OpenLayers), Tailwind CSS
// Backend: Next.js API Routes, Node.js, pg (PostgreSQL client)
// Database: PostgreSQL with PostGIS extension
// Security: Token-based authentication, input validation, parameterized queries
// Tools: Git for version control, Visual Studio Code for development
// This project was an excellent opportunity to combine my interests in web development and geospatial analysis. It reinforced the importance of building secure, efficient applications that provide real value to users through intuitive interfaces and reliable backend services.

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import { LangProps } from "@/interfaces";
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
            {/* <p className="text-xl font-semibold">{intl["project-geoserver-title"]}</p>

            <p>{intl["project-geoserver-intro"]}</p>

            <p>{intl["project-geoserver-dev"]}</p>

            <p>{intl["project-geoserver-frontend"]}</p>

            <p>{intl["project-geoserver-backend"]}</p>

            <p>{intl["project-geoserver-mobile"]}</p>

            <p>{intl["project-geoserver-contract"]}</p>

            <p>{intl["project-geoserver-deployment"]}</p> */}
        </div>
        <div className="flex flex-col w-full lg:w-[30%]">
          <p className="text-xl font-semibold">{intl["links"]}</p>
          <Link
            href="https://github.com/paschendale/slope"
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
              <span>paschendale/slope</span>
            </Button>
          </Link>
          <Link
            href="https://slope.marotta.dev"
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
              <span>Slope (Live Demo)</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
