<template>
    <ui-page screen="custom">
        <ui-level class="flex-col h-full">
            <ui-wrapper class="h-full w-full">
                <ui-level class="h-full">
                    <ui-level class="flex-col flex-1" vertical-align="top">
                        <h1 class="font-semibold mb-4 text-5xl">
                            We bring artists to light
                        </h1>
                        <p class="text-xl mb-2">
                            Discover the future of creativity and be at the art
                            forefront
                        </p>
                        <a href="#artgrid">Discover more</a>
                    </ui-level>

                    <n-carousel
                        effect="card"
                        prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
                        next-slide-style="transform: translateX(50%) translateZ(-800px);"
                        style="height: 400px"
                        autoplay
                        :show-dots="false"
                        class="flex-1"
                    >
                        <n-carousel-item :style="{ width: '60%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/header/image 13.png"
                            />
                        </n-carousel-item>
                        <n-carousel-item :style="{ width: '60%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/header/image 14.png"
                            />
                        </n-carousel-item>
                        <n-carousel-item :style="{ width: '60%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/header/image 15.png"
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
                </ui-level>
            </ui-wrapper>

            <ui-level class="bg-[#3A3A3A] h-20 w-full" align="center">
                <p class="text-white text-2xl">
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
</script>

<style scoped>
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
