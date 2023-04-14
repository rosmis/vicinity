<template>
    <ui-level class="flex-col">
        <HomeHeader v-if="artworks" :artworks="shuffle(artworks.data.data)" />
        <HomeGrid v-if="artworks" :grid-array="shuffle(artworks.data.data)" />
        <HomeFooter />
        <!-- <HomeArtWork :artwork="artwork?.data.data" /> -->
    </ui-level>
</template>

<script lang="ts" setup>
import axios from "axios";
import { shuffle } from "lodash";
import { useQuery } from "vue-query";
import { headerOptions } from "../composables/useHeadersToken";

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
