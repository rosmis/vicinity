<template>
    <ui-level class="flex-col">
        <HomeHeader
            v-if="initialArtworks"
            :artworks="initialArtworks.slice(0, 3)"
            :is-mobile="isMobile"
        />
        <HomeGrid
            v-if="initialArtworks"
            :grid-array="initialArtworks"
            :is-mobile="isMobile"
        />
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
            v-if="selectedArtworkId && !isMobile"
            :selected-artwork-id="selectedArtworkId"
            @close="
                selectedArtworkId = undefined;
                removeBodyNoScrollClass();
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
import { useMobileBreakpoint } from "../composables/useMobileBreakpoints";
import { ArtworkConfig, Artworks } from "../types/artworks";

const container = ref<Element>();
const selectedArtworkId = ref<number>();
const initialArtworks = ref<ArtworkConfig[]>();

onMounted(() => {
    removeBodyNoScrollClass();

    if (route.query.artworkId) {
        selectedArtworkId.value = +route.query.artworkId!;

        if (!isMobile.value) return;
        document.body.classList.add("no-scroll");
    }

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
const isMobile = useMobileBreakpoint("md");

const { data: _artworks } = useQuery(
    ["artworks", route.query.artworkId],
    () =>
        axios.get<Artworks>(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/artworks?populate=*&pagination[pageSize]=50`,
            headerOptions
        ),
    {
        onSuccess: (artworks) => {
            initialArtworks.value = shuffle(artworks.data.data);
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    }
);

function removeBodyNoScrollClass() {
    document.body.classList.remove("no-scroll");
}

watch(
    () => route.query,
    () => {
        selectedArtworkId.value = +route.query.artworkId!;
    }
);
</script>

<style>
.no-scroll {
    overflow-y: hidden;
}
</style>
