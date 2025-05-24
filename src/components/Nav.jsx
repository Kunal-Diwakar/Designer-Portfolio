"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Nav = () => {
  const navbar = useRef();

  useGSAP(
    () => {
      const container = document.querySelector(".container");
      const menuToggle = document.querySelector(".menu-toggle");
      const menuOverlay = document.querySelector(".menu-overlay");
      const menuContent = document.querySelector(".menu-content");

      let isOpen = false;
      let isAnimating = false;

      menuToggle.addEventListener("click", () => {
        if (!isOpen) openMenu();
        else closeMenu();
      });

      function animateMenuToggle(isOpening) {
        const open = document.querySelector("#menu-open");
        const close = document.querySelector("#menu-close");

        gsap.to(isOpening ? open : close, {
          x: isOpening ? -5 : 5,
          y: isOpening ? -10 : 10,
          rotation: isOpening ? -5 : 5,
          opacity: 0,
          delay: 0.25,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(isOpening ? close : open, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          delay: 0.5,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      function openMenu() {
        if (isAnimating || isOpen) return;
        isAnimating = true;

        gsap.to(container, {
          rotation: 10,
          x: 300,
          y: 450,
          scale: 1.5,
          duration: 1.25,
          ease: "power4.inOut",
        });

        animateMenuToggle(true);

        gsap.to(menuContent, {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
          duration: 1.25,
          ease: "power4.inOut",
          onComplete: () => {
            isOpen = true;
            isAnimating = false;
          },
        });
      }

      function closeMenu() {
        if (isAnimating || !isOpen) return;
        isAnimating = true;

        gsap.to(container, {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.inOut",
        });

        animateMenuToggle(false);

        gsap.to(menuContent, {
          rotation: -15,
          x: -100,
          y: -100,
          scale: 1.5,
          duration: 1.25,
          ease: "power4.inOut",
        });

        gsap.to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "power4.inOut",
          onComplete: () => {
            isOpen = false;
            isAnimating = false;
          },
        });
      }
    },
    { scope: navbar }
  );

  return (
    <div ref={navbar}>
      <nav className="fixed left-0 top-0 w-screen p-4 px-8 flex justify-between items-center z-20 text-white mix-blend-difference">
        <a href="#">Mohit Kumar</a>

        <div className="menu-toggle relative w-12 h-6 cursor-pointer flex items-center mix-blend-difference">
          <p id="menu-open">More</p>
          <p id="menu-close">Close</p>
        </div>
      </nav>

      <div className="menu-overlay fixed w-screen h-svh bg-[#0f0f0f] z-10 text-white">
        <div className="menu-content">
          <div className="menu-items w-screen gap-8 flex flex-col md:flex-row justify-items-start p-4 px-8">
            <div className="row flex gap-8">
              <p className="row-title">About</p>
              <p className="row-content">
                Greetings, I am Mohit, <br />
                a dedicated college student <br />
                with a strong passion for <br />
                graphic and poster design. <br /> <br />

                This platform showcases <br />
                a curated collection of my work, <br />
                each piece crafted with creativity, <br />
                precision, and a deep appreciation <br />
                for visual storytelling. <br /> <br />

                I am available for freelance projects <br />
                and open to collaborations that <br />
                require innovative design solutions. <br />
                If you have an opportunity in mind, <br />
                feel free to reach out. <br />
              </p>
            </div>

            <div className="row flex gap-8">
              <p className="row-title">Credit</p>
              <p className="row-content">
                Designed & Developed <br /> By{" "}
                <a href="mailto:kunaldiwakar1999@gmail.com">Kunal Diwakar</a>
              </p>
            </div>
          </div>

          <div className="menu-footer absolute w-screen gap-8 flex justify-between p-4 px-8 bottom-0">
            <a
              href="https://www.instagram.com/mohit_kr11_?igsh=MTE5d3l0b2toYjdldw=="
              target="_blank"
            >
              <p>IG</p>
            </a>
            <a href="mailto:mohit2005211@gmail.com">
              <p>Mail</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
