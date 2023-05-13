<template>
    <div
        class="flex flex-col bg-black/15 inset-0 backdrop-filter backdrop-blur-sm fixed"
    >
        <div
            screen="art"
            class="bg-white rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute overflow-y-auto gs_to_top artworkTransform"
            ref="outsideWrapper"
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
                <ui-level class="h-full" space="lg" vertical-align="top">
                    <ui-level v-if="artwork" class="flex-col w-1/2">
                        <ui-level
                            class="flex-col w-full"
                            vertical-align="bottom"
                        >
                            <ui-level align="right" space="xl">
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

                        <HomeArtWorkAditionnal
                            v-if="
                                artwork?.data.data.attributes.aditionnalImages
                                    .data
                            "
                            :aditionnal-images="
                                artwork.data.data.attributes.aditionnalImages
                                    .data
                            "
                            type="aditionnal"
                            :is-mobile="isMobile"
                        />

                        <HomeArtWorkAditionnal
                            v-else-if="
                                artworksByArtist &&
                                artworksByArtist?.data.data &&
                                !artwork?.data.data.attributes.aditionnalImages
                                    .data
                            "
                            :aditionnal-images="artworksByArtist?.data.data"
                            :is-mobile="isMobile"
                            type="more"
                        />
                    </ui-level>

                    <div
                        ref="imageColumn"
                        class="flex flex-col h-full w-1/2 items-start justify-start"
                    >
                        <ui-level class="my-6 w-full" align="center">
                            <div
                                v-if="isImageHovered"
                                class="inset-0 absolute filterBlur"
                            ></div>
                            <div
                                v-if="artwork"
                                :style="{
                                    backgroundImage: `url(${
                                        mainArtworkFormat[
                                            Object.keys(
                                                mainArtworkFormat
                                            ).includes('medium')
                                                ? 'medium'
                                                : 'small'
                                        ].url
                                    })`,
                                    height: `${formattedImageHeight}px`,
                                    transformOrigin: `${
                                        mainImageRatio === 'landscape' ||
                                        mainImageRatio === 'square'
                                            ? 'right center'
                                            : 'center center'
                                    }`,
                                }"
                                class="bg-cover bg-no-repeat cursor-pointer z-10 hoverEffect relative"
                                @mouseover="isImageHovered = true"
                                @mouseleave="isImageHovered = false"
                            >
                                <ui-level
                                    align="center"
                                    class="rounded-md cursor-pointer p-1 bottom-4 left-4 absolute filterBlur"
                                    @click="
                                        downloadFromUrl(
                                            mainArtworkFormat[
                                                Object.keys(
                                                    mainArtworkFormat
                                                ).includes('medium')
                                                    ? 'medium'
                                                    : 'small'
                                            ].url,
                                            'test',
                                            { openInNew: true }
                                        )
                                    "
                                >
                                    <n-icon size="24" color="white"
                                        ><DownloadOutline
                                    /></n-icon>
                                </ui-level>
                            </div>
                        </ui-level>

                        <HomeArtWorkAditionnal
                            v-if="
                                artworksByArtist &&
                                artworksByArtist?.data.data &&
                                artwork?.data.data.attributes.aditionnalImages
                                    .data
                            "
                            :aditionnal-images="artworksByArtist?.data.data"
                            :is-mobile="isMobile"
                            type="more"
                        />
                    </div>
                </ui-level>
            </ui-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close, DownloadOutline } from "@vicons/ionicons5";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { useOpenArtworkAnimation } from "../../composables/gsap/useOpenArtworkAnimation";
import { downloadFromUrl } from "../../composables/useDownloadFromUrl";
import { headerOptions } from "../../composables/useHeadersToken";
import { Artwork, Artworks } from "../../types/artworks";

const props = defineProps<{
    selectedArtworkId: number;
    isMobile: boolean;
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

const route = useRoute();

onMounted(() => {
    imageColumnWidth.value = imageColumn.value!.clientWidth * 0.6;
    useOpenArtworkAnimation().play().timeScale(2);
});

const imageColumn = ref<HTMLDivElement>();
const outsideWrapper = ref<HTMLDivElement>();

const imageColumnWidth = ref<number>();
const isImageHovered = ref(false);
const selectedArtworkId = ref<number>(props.selectedArtworkId);

const { data: artwork } = useQuery(
    ["artwork", selectedArtworkId],
    () =>
        axios.get<Artwork>(
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
    ["artworksByArtist", selectedArtworkId],
    () =>
        axios.get<Artworks>(
            `${
                import.meta.env.VITE_STRAPI_URL
            }/api/artworks?filters[artists][id][$eq]=${
                artwork.value?.data.data.attributes.artists.data[0].id
            }&filters[id][$ne]=${
                artwork.value?.data.data.id
            }&populate=mainImage`,
            headerOptions
        ),
    {
        enabled: computed(() => !!artwork.value?.data.data),
        refetchOnWindowFocus: false,
    }
);

const mainArtworkFormat = computed<ArtworkImageFormat>(
    () => artwork.value?.data.data.attributes.mainImage.data.attributes.formats
);

const mainImageRatio = computed(() => {
    const artWorkImage =
        artwork.value?.data.data.attributes?.mainImage.data.attributes?.formats[
            Object.keys(mainArtworkFormat.value).includes("medium")
                ? "medium"
                : "small"
        ];

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
    // nextTick(() => {
    //     window.scroll({
    //         behavior: "smooth",
    //         top: document.getElementById("mainContainer")?.offsetTop,
    //     });
    // });
    console.log("feature coming soon");
}

watch(
    () => route.query,
    () => {
        selectedArtworkId.value = +route.query.artworkId!;
        scrollToTop();
    }
);

onClickOutside(outsideWrapper, (_event) => emit("close"));
</script>

<script lang="ts">
interface ArtworkImageFormat {
    medium: {
        url: string;
    };
    small: {
        url: string;
    };
}
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

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-auto-rows: minmax(16px, auto);
    grid-gap: 16px;
}

.artworkTransform {
    transform: translate(0, 100%);
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
