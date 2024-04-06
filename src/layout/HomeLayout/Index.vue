<template>
    <header class="header">
        <a href="/" class="logo">
            <img src="@/assets/images/logo.png" alt="logo" />
            <h1 class="title">Mall System</h1>
        </a>
    </header>
    <aside class="aside">
        <div class="scroll">
            <Menu class="menu" />
        </div>
    </aside>
    <main class="main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </main>
</template>

<script setup>
import Menu from './Menu.vue';
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        padding: 0 $side-padding;
        height: $header-height;
        background-color: #23262e;
        .logo {
            display: flex;
            align-items: center;
            font-size: 0;
            cursor: pointer;
            img {
                margin-top: -4px;
                width: 42px;
            }
            .title {
                margin-left: 12px;
                font-size: $size-hg;
                color: #fff;
                font-weight: 700;
                letter-spacing: 1.5px;
            }

        }

    }
    .aside {
        position: absolute;
        top: $header-height;
        left: 0;
        bottom: 0;
        width: $aside-width;
        background-color: #393d49;
        overflow: hidden;
        .scroll {
            position: relative;
            padding: $side-padding 0;
            width: calc(100% + 20px);
            height: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            overflow-y: auto;
            .menu {
                width: $aside-width;
            }
        }
    }
    .main {
        position: absolute;
        top: $header-height;
        left: $aside-width;
        right: 0;
        bottom: 0;
        background-color: $background-grey-page;
        overflow-y: auto;
    }
</style>
