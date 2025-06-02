// About.jsx
import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { motion, useInView } from "framer-motion";

const useCounterWhenVisible = (ref, target, speed = 40) => {
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (!isInView || count >= target) return;
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [isInView, count, target, speed]);

  return count;
};

const About = () => {
  const refExcellence = useRef(null);
  const refProjects = useRef(null);
  const refSquare = useRef(null);
  const refOngoing = useRef(null);

  const yearsOfExcellence = useCounterWhenVisible(refExcellence, 10);
  const projectsCompleted = useCounterWhenVisible(refProjects, 12);
  const minSquareDelivered = useCounterWhenVisible(refSquare, 20);
  const ongoingProjects = useCounterWhenVisible(refOngoing, 25);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="About"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        About{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          Our Brand
        </span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mb-8">
        Passionate About Properties, Dedicated to Your Vision
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
        <img
          src={assets.brand_img}
          className="w-full sm:w-1/2 max-w-lg"
          alt="Brand"
        />
        <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
            <div>
              <p ref={refExcellence} className="text-4xl font-medium text-gray-800">
                {yearsOfExcellence}+
              </p>
              <p>Years of Excellence</p>
            </div>
            <div>
              <p ref={refProjects} className="text-4xl font-medium text-gray-800">
                {projectsCompleted}+
              </p>
              <p>Projects Completed</p>
            </div>
            <div>
              <p ref={refSquare} className="text-4xl font-medium text-gray-800">
                {minSquareDelivered}+
              </p>
              <p>Mn. Sq. Ft. Delivered</p>
            </div>
            <div>
              <p ref={refOngoing} className="text-4xl font-medium text-gray-800">
                {ongoingProjects}+
              </p>
              <p>Ongoing Projects</p>
            </div>
          </div>
          <p className="my-10 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At quia
            laboriosam perspiciatis consequatur. Ab optio molestias id
            voluptatum magnam vel sunt quasi eveniet laborum velit hic facere
            nam unde est. Dolore, excepturi.
          </p>
          <button className="bg-blue-600 text-white px-8 py-2 rounded">
            Learn more
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
