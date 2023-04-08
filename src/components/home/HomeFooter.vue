<template>
  <ui-wrapper color="black" class="w-full" padded>
    <ui-level>
      <ui-level class="flex-col" vertical-align="top">
        <router-link :to="{ name: 'Home' }">
          <img src="../../assets/LOGO.png" alt="logo vicinity" />
        </router-link>
        <p class="text-white text-xs">
          ©2023 Vicinity Art, <br />
          All rights reserved
        </p>
      </ui-level>
      <ui-level class="flex-col" vertical-align="bottom">
        <p class="text-white">Follow us on instagram</p>
        <router-link to="https://www.instagram.com/vicinity_art/">
          <n-icon class="text-white text-3xl"><LogoInstagram /></n-icon>
        </router-link>
      </ui-level>
    </ui-level>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import { LogoInstagram } from "@vicons/ionicons5";
</script>
