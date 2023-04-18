<template>
    <div
        class="flex flex-col bg-black/15 inset-0 backdrop-filter backdrop-blur-sm fixed overflow-y-auto"
    >
        <div
            screen="art"
            class="h-full bg-red-400 rounded-t-2xl w-full top-8 right-0 bottom-0 left-0 absolute"
            :class="{ filterBlur: isImageHovered }"
        >
            <ui-level align="right" class="w-full pt-4 pr-4">
                <n-icon class="cursor-pointer" @click="emit('close')"
                    ><Close
                /></n-icon>
            </ui-level>

            <ui-wrapper padded class="h-full">
                <ui-level class="h-full">
                    <ui-level
                        v-if="artwork"
                        class="flex-col h-full bg-blue-500 w-1/2"
                        vertical-align="top"
                        align="left"
                    >
                        <div class="w-full">
                            <h1 class="text-right w-full text-2xl">
                                "{{ artwork.attributes.title }}"
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
                    <div
                        ref="imageColumn"
                        class="flex h-full bg-green-500 w-1/2 items-end"
                    >
                        <div
                            v-if="artwork"
                            :style="{
                                backgroundImage: `url(${artwork.attributes?.mainImage.data.attributes?.formats.medium.url})`,
                                height: `${formattedImageHeight}px`,
                            }"
                            class="bg-cover bg-no-repeat hoverEffect"
                            :class="{ filterUnBlur: isImageHovered }"
                        ></div>
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
    imageColumnWidth.value = imageColumn.value!.clientWidth;
});

const imageColumn = ref<HTMLDivElement>();
const imageColumnWidth = ref<number>();
const isImageHovered = ref(true);

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
    position: relative;
    width: 100%;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
    transform: translateZ(0);
}
.filterBlur > * {
    filter: blur(10px);
}
.filterUnBlur {
    /* mask-image: none;
    -webkit-mask-image: none;
    -moz-mask-image: none;
    -o-mask-image: none;
    -ms-mask-image: none; */
}
.hoverEffect:hover {
    transform: scale(1.3) translateZ(0);
}
</style>
