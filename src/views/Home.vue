<template>
    <ui-level class="flex-col">
        <HomeHeader
            v-if="artworks"
            :artworks="shuffle(artworks.data.data.slice(0, 3))"
        />
        <HomeGrid v-if="artworks" :grid-array="shuffle(artworks.data.data)" />
        <HomeFooter />

        <n-tooltip placement="left" trigger="hover">
            <template #trigger>
                <div
                    ref="container"
                    class="bg-white rounded-full cursor-pointer h-20 shadow-xl p-2 right-4 bottom-4 w-20 z-30 fixed"
                ></div>
            </template>
            Coming soon...
        </n-tooltip>

        <HomeArtWork
            v-if="selectedArtworkId"
            :selected-artwork-id="selectedArtworkId"
            @close="
                selectedArtworkId = undefined;
                router.push({ name: 'Home', query: {} });
            "
        />
    </ui-level>
</template>

<script lang="ts" setup>
import axios from "axios";
import { shuffle } from "lodash";
import lottie from "lottie-web";
import { NTooltip } from "naive-ui";
import { onMounted, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute, useRouter } from "vue-router";
import animationData from "../assets/bouton randomize lottie.json";
import { headerOptions } from "../composables/useHeadersToken";

const container = ref<Element>();
const selectedArtworkId = ref<number>();

onMounted(() => {
    if (route.query) selectedArtworkId.value = +route.query.artworkId;

    const params = {
        container: container.value!,
        loop: true,
        autoplay: true,
        animationData: animationData,
    };
    lottie.loadAnimation(params);
});

const router = useRouter();
const route = useRoute();

const { data: artworks } = useQuery(
    ["artworks", route.query.artworkId],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/artworks?populate=*&pagination[pageSize]=50`,
            headerOptions
        ),
    { refetchOnWindowFocus: false, keepPreviousData: true }
);

watch(
    () => route.query,
    () => {
        selectedArtworkId.value = +route.query.artworkId;
    }
);
</script>
