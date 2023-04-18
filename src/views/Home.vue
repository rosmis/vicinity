<template>
    <ui-level class="flex-col">
        <HomeHeader
            v-if="artworks"
            :artworks="shuffle(artworks.data.data.slice(0, 3))"
            :is-mobile="isMobile"
        />
        <HomeGrid
            v-if="artworks"
            :grid-array="shuffle(artworks.data.data)"
            :is-mobile="isMobile"
        />
        <HomeFooter />

        <n-tooltip placement="left" trigger="hover">
            <template #trigger>
                <div
                    ref="container"
                    class="bg-white rounded-full cursor-pointer shadow-xl p-2 right-4 bottom-4 w-20 z-30 fixed"
                ></div>
            </template>
            Coming soon...
        </n-tooltip>

        <!-- <HomeArtWork :artwork="artwork?.data.data" /> -->
    </ui-level>
</template>

<script lang="ts" setup>
import axios from "axios";
import { shuffle } from "lodash";
import lottie from "lottie-web";
import { NTooltip } from "naive-ui";
import { onMounted, ref } from "vue";
import { useQuery } from "vue-query";
import animationData from "../assets/bouton randomize lottie.json";
import { headerOptions } from "../composables/useHeadersToken";
import { useMobileBreakpoint } from "../composables/useMobileBreakpoints";

const container = ref<Element>();

onMounted(() => {
    const params = {
        container: container.value!,
        loop: true,
        autoplay: true,
        animationData: animationData,
    };
    lottie.loadAnimation(params);
});

const isMobile = useMobileBreakpoint("md");

// const route = useRoute();

// const selectedArtworkId = ref<number>();

const { data: artworks } = useQuery(
    ["artworks"],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/artworks?populate=*&pagination[pageSize]=50`,
            headerOptions
        ),
    { refetchOnWindowFocus: false }
);

// const { data: artwork } = useQuery(
//     ["artworks", selectedArtworkId.value],
//     () =>
//         axios.get(
//             `${import.meta.env.VITE_STRAPI_URL}/api/artworks/${
//                 selectedArtworkId.value
//             }?populate=*`,
//             headerOptions
//         ),
//     { enabled: computed(() => !!selectedArtworkId.value) }
// );

// watch(
//     () => route.query,
//     () => {
//         selectedArtworkId.value = route.query.artworkId;
//         console.log(route.query);
//     }
// );
</script>
