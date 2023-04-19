<template>
    <template v-if="imageSource && ratioGrid">
        <div
            v-if="ratio === 'portrait'"
            class="cursor-pointer w-full wrapper portrait overflow-hidden"
            :style="{
                height: `${realImageHeight}px`,
                gridRowEnd: `span ${ratioGrid + 2}`,
            }"
            @click="
                router.push({ name: 'Home', query: { artworkId: imageIndex } })
            "
        >
            <div
                class="bg-contain bg-no-repeat rounded-lg h-full w-full hover"
                :style="{
                    backgroundImage: `url(${imageSource})`,
                }"
            ></div>
        </div>

        <div
            v-if="ratio === 'square'"
            class="cursor-pointer w-full wrapper overflow-hidden"
            :style="{
                gridRowEnd: `span ${ratioGrid + 2}`,
                height: `${columnWidth}px`,
            }"
        >
            <div
                class="bg-contain bg-no-repeat rounded-lg h-full w-full hover"
                :style="{
                    backgroundImage: `url(${imageSource})`,
                }"
            ></div>
        </div>

        <div
            v-if="ratio === 'blank'"
            class="bg-white rounded-lg w-full square"
        ></div>
    </template>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
    defineProps<{
        imageSource: string;
        imageHeight: number;
        imageIndex: number;
        imageWidth: number;
        ratio?: "square" | "portrait" | "blank";
        columnWidth: number;
    }>(),
    {
        ratio: "portrait",
    }
);

const router = useRouter();

const realImageHeight = ref<number>();
const ratioGrid = ref<number>();

onMounted(() => {
    realImageHeight.value =
        props.columnWidth * (props.imageHeight / props.imageWidth);

    ratioGrid.value = Math.min(7, Math.floor(+realImageHeight.value / 40));
});
</script>

<style scoped>
.portrait {
    aspect-ratio: 9/16;
}
.square {
    aspect-ratio: 1;
}

.hover {
    transition: 0.2s ease-in-out all;
}
.wrapper:hover .hover {
    transform: scale(1.1);
}

.hover:hover .hover::before {
    display: block;
}
.hover::before {
    content: "";
    display: none;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
