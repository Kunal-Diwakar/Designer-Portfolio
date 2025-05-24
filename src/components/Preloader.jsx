"use client";

import collection from "@/app/data"; // Importing images
import { useEffect, useRef, useState, createRef } from "react";
import gsap from "gsap/all";

const Preloader = () => {
  const containerRef = useRef(null);
  const refs = useRef(collection.map(() => createRef())); // Assign refs dynamically
  const [loadingComplete, setLoadingComplete] = useState(false); // Track if preloader is done
  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  useEffect(() => {
    const counter = document.querySelector(".counter");
    const preloader = document.querySelector(".preloader");
    const milestones = [0, 15, 30, 45, 60, 75, 95, 100];
    let currentIndex = 0;

    const updateCounter = () => {
      if (currentIndex < milestones.length) {
        counter.textContent = `${milestones[currentIndex]}%`;
        currentIndex++;
        setTimeout(updateCounter, 800);
      } else {
        gsap.to(preloader, {
          duration: 1,
          y: "-100%",
          ease: "power4.inOut",
        });
        setLoadingComplete(true); // Stop image trail when counter reaches 100%
      }
    };

    setTimeout(updateCounter, 800);

    const activate = (image, x, y) => {
      if (loadingComplete) return; // Stop activation after 100%

      const containerRect = containerRef.current?.getBoundingClientRect();
      const relativeX = x - containerRect.left;
      const relativeY = y - containerRect.top;
      image.style.left = `${relativeX}px`;
      image.style.top = `${relativeY}px`;
      image.style.zIndex = (globalIndex % collection.length) + 1;
      image.dataset.status = "active";

      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1000);

      last = { x, y };
    };

    const distanceFromLast = (x, y) => {
      return Math.hypot(x - last.x, y - last.y);
    };

    const deactivate = (image) => {
      image.dataset.status = "inactive";
    };

    const handleOnMove = (e) => {
      if (loadingComplete) return; // Prevent mouse movement effect after 100%

      // 🔹 Only allow image trail effect if viewport width > 768px
      if (window.innerWidth <= 768) return;

      if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
        const lead = refs.current[globalIndex % refs.current.length].current;
        const tail =
          refs.current[(globalIndex - 5) % refs.current.length]?.current;

        if (lead) activate(lead, e.clientX, e.clientY);
        if (tail) deactivate(tail);

        globalIndex++;
      }
    };

    document.addEventListener("mousemove", handleOnMove);
    document.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));

    return () => {
      document.removeEventListener("mousemove", handleOnMove);
      document.removeEventListener("touchmove", (e) =>
        handleOnMove(e.touches[0])
      );
    };
  }, [loadingComplete]); // React to loadingComplete state

  return (
    <div
      ref={containerRef}
      className="preloader fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50 bg-[#0f0f0f] text-white select-none overflow-hidden"
    >
      {collection.map((item, index) => (
        <img
          key={index}
          className="object-cover w-48 h-48 max-w-[150px] max-h-[200px] opacity-0 data-[status='active']:opacity-100 transition-opacity duration-500 ease-out absolute -translate-y-1/2 -translate-x-1/2 rounded-md"
          data-index={index}
          data-status="inactive"
          src={item.img}
          alt={item.title}
          ref={refs.current[index]}
        />
      ))}

      <div className="title text-2xl md:text-6xl font-bold uppercase leading-[1] tracking-tighter mb-4 text-center absolute z-50 mix-blend-difference">
        <h1>
          Only Good <br /> Designs Here.
        </h1>
      </div>

      <div className="counter absolute bottom-0 mb-8 font-medium">0%</div>
    </div>
  );
};

export default Preloader;
