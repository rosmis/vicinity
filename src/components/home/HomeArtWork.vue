<template>
    <div
        class="flex flex-col bg-black/15 inset-0 backdrop-filter backdrop-blur-sm fixed overflow-y-auto"
    >
        <div
            screen="art"
            class="bg-white rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute overflow-y-auto"
            id="mainContainer"
        >
            <ui-level
                align="right"
                class="bg-white w-full p-4 top-0 z-30 sticky"
            >
                <n-icon class="cursor-pointer" size="24" @click="emit('close')"
                    ><Close
                /></n-icon>
            </ui-level>

            <ui-wrapper padded class="h-full">
                <ui-level class="h-full" space="lg">
                    <ui-level
                        v-if="artwork"
                        class="flex-col h-full w-2/5"
                        vertical-align="top"
                        align="left"
                    >
                        <ui-level
                            class="flex-col w-full top-24 right-0 left-0 sticky"
                            vertical-align="bottom"
                        >
                            <ui-level align="right" space="2xl">
                                <ui-profile-picture
                                    :user-infos="
                                        artwork.data.data.attributes.artists
                                            .data[0]
                                    "
                                />

                                <div>
                                    <h1 class="text-right w-full text-3xl">
                                        "{{
                                            artwork.data.data.attributes.title
                                                ? artwork.data.data.attributes
                                                      .title
                                                : `Untitled ${artwork.data.data.id}`
                                        }}"
                                    </h1>
                                    <h1 class="text-right w-full text-2xl">
                                        By
                                        {{
                                            artwork.data.data.attributes.artists
                                                .data[0].attributes.fullName
                                        }}
                                    </h1>
                                </div>
                            </ui-level>
                            <p>
                                {{ artwork.data.data.attributes.description }}
                            </p>
                        </ui-level>
                    </ui-level>

                    <div
                        ref="imageColumn"
                        class="flex flex-col h-full w-3/5 items-start justify-start"
                    >
                        <ui-level class="my-6 w-full" align="center">
                            <div
                                v-if="isImageHovered"
                                class="inset-0 absolute filterBlur"
                            ></div>
                            <div
                                v-if="artwork"
                                :style="{
                                    backgroundImage: `url(${artwork.data.data.attributes?.mainImage.data.attributes?.formats.small.url})`,
                                    height: `${formattedImageHeight}px`,
                                    transformOrigin: `${
                                        mainImageRatio === 'landscape' ||
                                        mainImageRatio === 'square'
                                            ? 'right center'
                                            : 'center center'
                                    }`,
                                }"
                                class="bg-cover bg-no-repeat cursor-pointer z-10 hoverEffect"
                                @mouseover="isImageHovered = true"
                                @mouseleave="isImageHovered = false"
                            ></div>
                        </ui-level>

                        <div
                            v-if="
                                artwork?.data.data.attributes.aditionnalImages
                                    .data
                            "
                            class="mt-[8%] w-full"
                            ref="gridContainer"
                        >
                            <h1 class="mb-4 text-2xl">Aditionnal images</h1>

                            <div class="w-full grid-container justify-center">
                                <HomeArtWorkCard
                                    v-for="(item, index) in artwork.data.data
                                        .attributes.aditionnalImages.data"
                                    :key="index"
                                    :image-source="
                                        item.attributes.formats.small.url
                                    "
                                    :image-width="
                                        item.attributes.formats.small.width
                                    "
                                    :image-height="
                                        item.attributes.formats.small.height
                                    "
                                    :column-width="200"
                                    :image-index="item.id"
                                    disable-hover
                                />
                            </div>
                        </div>

                        <div
                            v-if="
                                artworksByArtist && artworksByArtist?.data.data
                            "
                            class="mt-[8%] w-full relative"
                        >
                            <h1 class="mb-4 text-2xl">
                                Discover more about this artist...
                            </h1>

                            <div class="w-full grid-container justify-center">
                                <HomeArtWorkCard
                                    v-for="(item, index) in artworksByArtist
                                        .data.data"
                                    :key="index"
                                    :image-source="
                                        item.attributes.mainImage.data
                                            .attributes.formats.small.url
                                    "
                                    :image-width="
                                        item.attributes.mainImage.data
                                            .attributes.formats.small.width
                                    "
                                    :image-height="
                                        item.attributes.mainImage.data
                                            .attributes.formats.small.height
                                    "
                                    :column-width="200"
                                    :image-index="item.id"
                                    disable-hover
                                />
                            </div>
                        </div>
                    </div>
                </ui-level>
            </ui-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@vicons/ionicons5";
import axios from "axios";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { headerOptions } from "../../composables/useHeadersToken";

const props = defineProps<{
    selectedArtworkId: number;
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

const route = useRoute();

onMounted(() => {
    imageColumnWidth.value = imageColumn.value!.clientWidth * 0.6;
});

const imageColumn = ref<HTMLDivElement>();
const gridContainer = ref<HTMLDivElement>();

const imageColumnWidth = ref<number>();
const isImageHovered = ref(false);
const selectedArtworkId = ref<number>(props.selectedArtworkId);

const { data: artwork } = useQuery(
    ["artwork", selectedArtworkId],
    () =>
        axios.get(
            `${import.meta.env.VITE_STRAPI_URL}/api/artworks/${
                selectedArtworkId.value
            }?populate=*&populate=artists.profilePicture,aditionnalImages,mainImage`,
            headerOptions
        ),
    {
        enabled: computed(() => !!selectedArtworkId.value),
        refetchOnWindowFocus: false,
    }
);

const { data: artworksByArtist } = useQuery(
    ["artworksByArtist", selectedArtworkId.value],
    () =>
        axios.get(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/artworks?filters[artists][id][$eq]=${
                artwork.value?.data.data.attributes.artists.data[0].id
            }&populate=mainImage`,
            headerOptions
        ),
    {
        enabled: computed(() => !!artwork.value?.data.data),
        refetchOnWindowFocus: false,
    }
);

const mainImageRatio = computed(() => {
    const artWorkImage =
        artwork.value?.data.data.attributes?.mainImage.data.attributes?.formats
            .medium;

    if (artWorkImage.height === artWorkImage.width) return "square";
    if (artWorkImage.height < artWorkImage.width) return "landscape";

    return "portrait";
});

const formattedImageHeight = computed(() => {
    const artWorkImage =
        artwork.value?.data.data.attributes?.mainImage.data.attributes?.formats
            .small;

    return (
        imageColumnWidth.value! * (+artWorkImage.height / +artWorkImage.width)
    );
});

function scrollToTop() {
    nextTick(() => {
        window.scroll({
            behavior: "smooth",
            top: document.getElementById("mainContainer")?.offsetTop,
        });
    });
}

watch(
    () => route.query,
    () => {
        selectedArtworkId.value = +route.query.artworkId!;
        scrollToTop();
    }
);
</script>

<style scoped>
.hoverEffect {
    width: 60%;
    transition: all 0.2s ease-in-out;
}

.hoverEffect:hover {
    transform: scale(1.4);
}

.filterBlur {
    backdrop-filter: blur(5px);
}

.whiteGradient {
    background: linear-gradient(
        0deg,
        rgb(255, 255, 255) 0%,
        rgba(255, 255, 255, 0.2) 100%
    );

    /* background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.2) 100%
    ); */
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-auto-rows: minmax(16px, auto);
    grid-gap: 16px;
}

/* TODO fix the transition ppty so it fades in and out for the backdrop-filter ppty */

/* .fade-enter,
.fade-leave-to {
    backdrop-filter: blur(0px);
}

.fade-enter-active {
    transition: backdrop-filter 1s ease-in-out;
    backdrop-filter: blur(10px);
}
.fade-leave-active {
    transition: backdrop-filter 1s ease-in-out;
    backdrop-filter: blur(0px);
} */
</style>
