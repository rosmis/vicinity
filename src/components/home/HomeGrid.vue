<template>
    <ui-wrapper id="artgrid" ref="artgridScroll" padded class="w-full">
        <p
            v-if="isMobile"
            class="font-semibold mt-12 text-xl mb-4 leading-relaxed"
        >
            Dive into a unique digital experience, through the secret garden of
            our emerging artists, from all over the world. Explore, record,
            share, contact... Let yourself be carried away by the universes and
            styles gathered by our team at Vicinity.
        </p>
        <div class="grid-container justify-center">
            <p
                v-if="!isMobile"
                class="font-semibold leading-relaxed text-4xl col-span-3"
                ref="introText"
                :style="{
                    gridRowEnd: `span ${ratioGrid! + 4}`,
                }"
            >
                Dive into a unique digital experience, through the secret garden
                of our emerging artists, from all over the world. Explore,
                record, share, contact... Let yourself be carried away by the
                universes and styles gathered by our team at Vicinity.
            </p>
            <template v-if="gridArray">
                <HomeArtWorkCard
                    v-for="(item, index) in gridArray"
                    :key="index"
                    :image-source="
                        item.attributes?.mainImage.data.attributes?.formats
                            .small.url
                    "
                    :image-width="
                        item.attributes?.mainImage.data.attributes?.formats
                            .small.width
                    "
                    :image-height="
                        item.attributes?.mainImage.data.attributes?.formats
                            .small.height
                    "
                    :column-width="isMobile ? 130 : 200"
                    :image-index="item.id"
                    :ratio="item.attributes.format"
                    :is-mobile="isMobile"
                />
            </template>
        </div>
    </ui-wrapper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ArtworkConfig } from "../../types/artworks";

defineProps<{
    gridArray: ArtworkConfig[];
    isMobile: boolean;
}>();

const ratioGrid = ref<number>();
const introText = ref<HTMLDivElement>();

onMounted(() => {
    ratioGrid.value = Math.min(
        7,
        Math.floor(introText.value?.offsetHeight! / 40)
    );
});
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-auto-rows: minmax(16px, auto);
    grid-gap: 16px;
}

@media screen and (max-width: 769px) {
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, 130px);
        grid-auto-rows: minmax(16px, auto);
        grid-gap: 16px;
    }
}
</style>
