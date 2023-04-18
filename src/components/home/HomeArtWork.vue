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
                <ui-level class="h-full">
                    <ui-level
                        v-if="artwork"
                        class="flex-col h-full"
                        vertical-align="top"
                        align="left"
                    >
                        <ui-level class="flex-col top-24 right-0 left-0 sticky">
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
                        class="flex flex-col h-full bg-green-400 w-1/2 items-start justify-center"
                    >
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

                        <h1 class="text-2xl">Images aditionnelles</h1>
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
    imageColumnWidth.value = imageColumn.value!.clientWidth * 0.8;
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
    width: 80%;
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
