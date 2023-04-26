import { gsap, Power3 } from "gsap";

export function useOpenArtworkAnimation() {
    const t4 = gsap.timeline({ paused: true });
    const artworkPage = document.querySelector(".gs_to_top");

    return t4.to(artworkPage, {
        transform: "translate(0, 0)",
        duration: 1,
        ease: Power3.easeInOut,
    });
}
