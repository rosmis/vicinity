<template>
    <div
        class="flex flex-col bg-black/15 inset-0 backdrop-filter backdrop-blur-sm fixed overflow-y-auto"
    >
        <div
            screen="art"
            class="bg-white rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute overflow-y-auto"
        >
            <ui-level align="right" class="w-full pt-4 pr-4 z-10">
                <n-icon class="cursor-pointer" @click="emit('close')"
                    ><Close
                /></n-icon>
            </ui-level>

            <ui-wrapper padded class="h-full">
                <ui-level class="h-full" space="lg">
                    <ui-level
                        v-if="artwork"
                        class="flex-col h-full w-1/2"
                        vertical-align="top"
                        align="left"
                    >
                        <ui-level
                            class="flex-col w-full top-24 right-0 left-0 sticky"
                            vertical-align="bottom"
                        >
                            <div>
                                <h1 class="text-right w-full text-2xl">
                                    "{{
                                        artwork.attributes.title
                                            ? artwork.attributes.title
                                            : `Untitled ${artwork.id}`
                                    }}"
                                </h1>
                                <h1 class="text-right text-xl w-full">
                                    By
                                    {{
                                        artwork.attributes.artists.data[0]
                                            .attributes.fullName
                                    }}
                                </h1>
                            </div>
                            <p>{{ artwork.attributes.description }}</p>
                        </ui-level>
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
                                    backgroundImage: `url(${artwork.attributes?.mainImage.data.attributes?.formats.medium.url})`,
                                    height: `${formattedImageHeight}px`,
                                }"
                                class="bg-cover bg-no-repeat cursor-pointer z-10 hoverEffect"
                                @mouseover="isImageHovered = true"
                                @mouseleave="isImageHovered = false"
                            ></div>
                        </ui-level>

                        <template
                            v-if="artwork.attributes.aditionnalImages.data"
                        >
                            <h1 class="mt-[8%] mb-4 text-2xl">
                                Aditionnal images
                            </h1>

                            <div class="w-full grid-container justify-center">
                                <HomeArtWorkCard
                                    v-for="(item, index) in artwork.attributes
                                        .aditionnalImages.data"
                                    :key="index"
                                    :image-source="
                                        item.attributes.formats.medium.url
                                    "
                                    :image-width="
                                        item.attributes.formats.medium.width
                                    "
                                    :image-height="
                                        item.attributes.formats.medium.height
                                    "
                                    :column-width="200"
                                    :image-index="item.id"
                                />
                            </div>
                        </template>
                    </div>
                </ui-level>
            </ui-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Close } from "@vicons/ionicons5";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
    artwork?: any;
}>();

const emit = defineEmits<{
    (event: "close"): void;
}>();

onMounted(() => {
    imageColumnWidth.value = imageColumn.value!.clientWidth * 0.6;
});

const imageColumn = ref<HTMLDivElement>();
const imageColumnWidth = ref<number>();
const isImageHovered = ref(false);

const formattedImageHeight = computed(() => {
    const artWorkImage =
        props.artwork.attributes?.mainImage.data.attributes?.formats.medium;

    return (
        imageColumnWidth.value! * (+artWorkImage.height / +artWorkImage.width)
    );
});
</script>

<style scoped>
.hoverEffect {
    width: 60%;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
}

.hoverEffect:hover {
    transform: scale(1.3);
}

.filterBlur {
    backdrop-filter: blur(5px);
}

.whiteGradient {
    background: linear-gradient(
        0deg,
        rgba(140, 27, 27, 1) 0%,
        rgba(156, 37, 37, 0.2) 100%
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
