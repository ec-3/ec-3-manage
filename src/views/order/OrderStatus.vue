<template>
    <div class="status-wrapper">
        <el-button type="primary" @click="orderStatusClick(-1)">All Orders</el-button>
        <el-popover effect="light" trigger="hover" placement="bottom" width="auto">
            <template #default>{{orderStatus[0].desc}}</template>
            <template #reference>
                <el-button plain @click="orderStatusClick(0)">{{orderStatus[0].label}}</el-button>
            </template>
        </el-popover>
        <el-popover effect="light" trigger="hover" placement="bottom" width="auto">
            <template #default>{{orderStatus[1].desc}}</template>
            <template #reference>
                <el-button type="primary" plain @click="orderStatusClick(1)">{{orderStatus[1].label}}</el-button>
            </template>
        </el-popover>
        <el-popover effect="light" trigger="hover" placement="bottom" width="auto">
            <template #default>{{orderStatus[2].desc}}</template>
            <template #reference>
                <el-button type="primary" plain @click="orderStatusClick(2)">{{orderStatus[2].label}}</el-button>
            </template>
        </el-popover>
        <el-popover effect="light" trigger="hover" placement="bottom" width="auto">
            <template #default>{{orderStatus[3].desc}}</template>
            <template #reference>
                <el-button type="primary" plain @click="orderStatusClick(3)">{{orderStatus[3].label}}</el-button>
            </template>
        </el-popover>
        <el-popover effect="light" trigger="hover" placement="bottom" width="auto">
            <template #default>{{orderStatus[4].desc}}</template>
            <template #reference>
                <el-button type="success" plain @click="orderStatusClick(4)">{{orderStatus[4].label}}</el-button>
            </template>
        </el-popover>
        <el-popover effect="light" trigger="hover" placement="bottom-start" width="auto">
            <template #default>{{orderStatus[9].desc}}</template>
            <template #reference>
                <el-button type="warning" plain @click="orderStatusClick(9)">{{orderStatus[9].label}}</el-button>
            </template>
        </el-popover>
    </div>
</template>

<script setup>
    import {defineProps, defineEmits} from 'vue';
    import {orderStatus} from '@/config.js';

    const emit = defineEmits(['status-change']);

    const orderStatusClick = status => {
        emit('status-change', status)
    };
</script>

<style scoped lang="scss">

</style>
