<template>
    <div
        v-if="userInfos.attributes.profilePicture.data"
        class="bg-cover rounded-full h-20 w-20"
        :style="{
            backgroundImage: `url(${userInfos.attributes.profilePicture.data.attributes.url})`,
        }"
    ></div>
    <ui-level v-else class="rounded-full bg-gray-300 h-15 w-15" align="center">
        <p class="text-lg">
            {{ userInfos.attributes.fullName.charAt(0).toUpperCase() }}
        </p>
    </ui-level>
</template>

<script lang="ts" setup>
defineProps<{
    userInfos: any;
}>();
</script>
