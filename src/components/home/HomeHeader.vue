<template>
    <ui-page :screen="isMobile ? '' : 'custom'">
        <ui-level class="flex-col h-full">
            <ui-wrapper class="w-full" :class="{ 'h-full': !isMobile }">
                <ui-level
                    class="h-full"
                    :class="{
                        'flex-col': isMobile,
                    }"
                    :space="isMobile ? 'xl' : null"
                >
                    <ui-level
                        class="flex-col flex-1"
                        vertical-align="top"
                        :align="isMobile ? 'left' : ''"
                        :class="{
                            'mt-4': isMobile,
                        }"
                    >
                        <h1
                            class="font-semibold text-5xl overflow-hidden"
                            :class="{
                                'mb-4': !isMobile,
                            }"
                        >
                            <span class="titleTransform gs_blinds">
                                We bring artists to light
                            </span>
                        </h1>
                        <p class="text-xl mb-2 overflow-hidden">
                            <span class="titleTransform gs_blinds">
                                Discover the future of creativity and be at the
                                art forefront
                            </span>
                        </p>
                        <a href="#artgrid">Discover more</a>
                    </ui-level>

                    <div
                        :class="{
                            'h-full w-full': isMobile,
                            'flex-1': !isMobile,
                        }"
                    >
                        <n-carousel
                            effect="card"
                            prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                            next-slide-style="transform: translateX(50%) translateZ(-800px);"
                            style="height: 400px"
                            autoplay
                            :show-dots="false"
                        >
                            <n-carousel-item
                                v-for="(item, index) in artworks"
                                :style="{ width: '60%' }"
                            >
                                <img
                                    class="carousel-img"
                                    :src="
                                        item.attributes?.mainImage.data
                                            .attributes?.formats.small.url
                                    "
                                    :key="`home${index}`"
                                />
                            </n-carousel-item>

                            <template #arrow="{ prev, next }">
                                <div class="custom-arrow">
                                    <button
                                        type="button"
                                        class="custom-arrow--left"
                                        @click="prev"
                                    >
                                        <n-icon><ArrowBack /></n-icon>
                                    </button>
                                    <button
                                        type="button"
                                        class="custom-arrow--right"
                                        @click="next"
                                    >
                                        <n-icon><ArrowForward /></n-icon>
                                    </button>
                                </div>
                            </template>
                        </n-carousel>
                    </div>
                </ui-level>
            </ui-wrapper>

            <ui-level
                class="bg-[#3A3A3A] w-full"
                align="center"
                :class="{ 'p-4': isMobile, 'h-20': !isMobile }"
            >
                <p
                    class="text-white text-2xl"
                    :class="{ 'text-center': isMobile }"
                >
                    <span class="italic"
                        >“Art is never finished, only abandoned”</span
                    >
                    - Leonard de Vinci
                </p>
            </ui-level>
        </ui-level>
    </ui-page>
</template>

<script lang="ts" setup>
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { NCarousel } from "naive-ui";
import { onMounted } from "vue";
import { useBlindRevealAnimation } from "../../composables/gsap/useBlindRevealAnimation";
import { ArtworkConfig } from "../../types/artworks";

defineProps<{
    artworks: ArtworkConfig[];
    isMobile: boolean;
}>();

onMounted(() => useBlindRevealAnimation());
</script>

<style scoped>
.titleTransform {
    display: block;
    transform: translate(0, 100%);
}
.custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}
</style>
