<template>
    <ui-level class="flex-col">
        <HomeHeader v-if="artworks" :artworks="shuffle(artworks.data.data)" />
        <HomeGrid v-if="artworks" :grid-array="shuffle(artworks.data.data)" />
        <HomeFooter />
    </ui-level>
</template>

<script lang="ts" setup>
import axios from "axios";
import { shuffle } from "lodash";
import { useQuery } from "vue-query";
import { headerOptions } from "../composables/useHeadersToken";

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

// const artworksData = computed(() => artworks.value?.data);
</script>
