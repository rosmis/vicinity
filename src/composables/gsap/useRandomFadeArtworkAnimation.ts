import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function useRandomFadeArtworkAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const artworks = gsap.utils.toArray(".artworkCard");

    console.log(artworks);

    // artworks.forEach((elem) => {
    //     gsap.set(elem, { autoAlpha: 0 });

    //     ScrollTrigger.create({
    //         trigger: elem,
    //         start: "top 90%",
    //         end: "top 20%",
    //         once: true,
    //         markers: true,
    //         onEnter: () => console.log("trigger"),
    //     });
    // });

    // ScrollTrigger.create({
    //     trigger: gridContainer,
    //     start: "top 90%",
    //     end: "top 20%",
    //     once: true,
    //     markers: true,
    //     onEnter: () => console.log("trigger"),
    // });
    // .counter(".counter-1", {end: 70, increment: 1, duration: 1.5})
}
