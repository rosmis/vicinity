<template>
    <ui-level class="flex-col" vertical-align="top" space="none">
        <HomeTopBar />

        <ui-wrapper color="white" class="h-10vh">
            <ui-level>
                <router-link :to="{ name: 'Home' }">
                    <img
                        src="https://res.cloudinary.com/dgbuqclbx/image/upload/v1681475001/LOGO_rrvawj.png"
                        alt="logo vicinity"
                        class="max-w-8/10"
                    />
                </router-link>
            </ui-level>
        </ui-wrapper>
    </ui-level>
</template>

<script lang="ts" setup></script>
