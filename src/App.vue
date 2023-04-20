<template>
    <Navbar />
    <router-view></router-view>
</template>

<script setup lang="ts">
import splitbee from "@splitbee/web";

// This initiliazes Splitbee.js
splitbee.init();
</script>
