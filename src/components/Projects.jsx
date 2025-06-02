// Projects.jsx
import { useEffect, useRef, useState } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Projects"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          Completed
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Crafting Spaces, Building Legacies — Explore Our Portfolio
      </p>

      <div className="flex justify-end items-center mb-8">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="p-3 bg-gray-200 cursor-pointer rounded mr-2 disabled:opacity-50"
          aria-label="Previous Project"
        >
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="p-3 bg-gray-200 cursor-pointer rounded mr-2 disabled:opacity-50"
          aria-label="Next Project"
        >
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      <div className="overflow-hidden embla max-w-screen-xl mx-auto" ref={emblaRef}>
        <div className="flex gap-8 embla__container">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="relative embla__slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
            >
              <img src={project.image} alt={project.title} />
              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white w-[80%] px-4 py-2 shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {project.price}
                    <span className="px-1">{project.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
