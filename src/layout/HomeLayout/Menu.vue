<template>
    <el-menu
        class="menu"
        active-text-color="#ffd04b"
        background-color="#393d49"
        text-color="#fff"
        :default-active="$route.path"
        :router="true"
    >
        <el-menu-item index="/products" :route="{path: '/products'}">
            <el-icon><Goods /></el-icon>
            <span>Products</span>
        </el-menu-item>
        <el-menu-item index="/orders">
            <el-icon><ShoppingBag /></el-icon>
            <span>Order List</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.menu {
}
</style>
