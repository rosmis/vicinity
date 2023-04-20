<template>
    <div
        class="w-full"
        :class="[
            {
                'h-full': full,
                'h-screen': screen === true,
                'h-80vh': screen === 'custom',
                'h-97vh': screen === 'art',
            },
        ]"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    full?: boolean;
    screen?: boolean | string | null;
}>();
</script>
