import { gsap, Power2 } from "gsap";

export function useBlindRevealAnimation() {
    const t3 = gsap.timeline({ paused: true });
    const titles = document.querySelectorAll(".gs_blinds");

    t3.to(
        titles,
        {
            transform: "translate(0, 0)",
            duration: 1,
            ease: Power2.easeInOut,
            stagger: 0.1,
        }
        // ">-0.6"
    ).play();
}
