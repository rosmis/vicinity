<template>
    <ui-wrapper class="mt-[8%] w-full">
        <ui-level class="flex-col" vertical-align="top">
            <h1 v-if="type === 'aditionnal'" class="mb-4 text-2xl">
                Aditionnal images
            </h1>
            <h1 v-else class="mb-4 text-2xl">
                Discover more about this artist...
            </h1>

            <div class="w-full grid-container justify-start">
                <HomeArtWorkCard
                    v-for="(item, index) in aditionnalImages"
                    :key="index"
                    :image-source="
                        type === 'aditionnal'
                            ? item.attributes.formats.small.url
                            : item.attributes.mainImage.data.attributes.formats
                                  .small.url
                    "
                    :image-width="
                        type === 'aditionnal'
                            ? item.attributes.formats.small.width
                            : item.attributes.mainImage.data.attributes.formats
                                  .small.width
                    "
                    :image-height="
                        type === 'aditionnal'
                            ? item.attributes.formats.small.height
                            : item.attributes.mainImage.data.attributes.formats
                                  .small.height
                    "
                    :column-width="180"
                    :image-index="item.id"
                    :is-mobile="isMobile"
                    :disable-hover="type === 'aditionnal' ? true : false"
                />
            </div>
        </ui-level>
    </ui-wrapper>
</template>

<script lang="ts" setup>
defineProps<{
    aditionnalImages: any[];
    type: "aditionnal" | "more";
    isMobile: boolean;
}>();
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: minmax(16px, auto);
    grid-gap: 16px;
}
</style>
