<template>
    <ui-level
        class="bg-[#3A3A3A] w-full"
        align="center"
        :class="{ 'py-4': isMobile, 'h-20': !isMobile }"
    >
        <p
            v-if="quote?.data"
            class="font-extrabold text-white text-5xl uppercase customFontSize"
            :class="{ 'text-center': isMobile }"
        >
            <span class="text-wrapper">
                <span class="italic">“{{ quote?.data[0].quote }}”</span>
                <span class="mr-4">- {{ quote?.data[0].author }}</span>

                <span class="italic">“{{ quote?.data[0].quote }}”</span>
                <span class="mr-4">- {{ quote?.data[0].author }}</span>

                <span class="italic">“{{ quote?.data[0].quote }}”</span>
                <span class="mr-4">- {{ quote?.data[0].author }}</span>
            </span>
        </p>
    </ui-level>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useQuery } from "vue-query";

defineProps<{
    isMobile: boolean;
}>();

const { data: quote } = useQuery(
    ["quote"],
    () =>
        axios.get("https://api.api-ninjas.com/v1/quotes?category=art", {
            headers: {
                "X-Api-Key": import.meta.env.VITE_QUOTE_API,
                "Content-Type": "application/json",
            },
        }),
    {
        refetchOnWindowFocus: false,
    }
);
</script>

<style>
.customFontSize {
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
}

.customFontSize .text-wrapper {
    display: inline-block;
    padding-left: 100%;
    animation: scrollAnimation 120s linear infinite;
}

@keyframes scrollAnimation {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
}
</style>
