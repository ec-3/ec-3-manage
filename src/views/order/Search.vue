<template>
    <div class="search-wrapper">
        <el-input class="input" v-model="username" clearable placeholder="Please input name" />
        <el-input class="input" v-model="phone" clearable placeholder="Please input phone" />
        <div class="date-picker">
            <el-date-picker
                v-model="orderDate"
                type="daterange"
                unlink-panels
                range-separator="To"
                start-placeholder="Order start date"
                end-placeholder="Order end date"
                :shortcuts="shortcuts"
            />
        </div>
        <el-button class="search-btn" type="danger" @click="searchHandle">Search</el-button>
    </div>
</template>

<script setup>
    import {ref, defineEmits} from 'vue';

    const username = ref('');
    const phone = ref('');
    const orderDate = ref('');

    const emit = defineEmits(['search-handle']);

    const searchHandle = () => {
        const starttime = orderDate.value && orderDate.value.length == 2 ? new Date(orderDate.value[0]).getTime() / 1000 : '';
        const endtime = orderDate.value && orderDate.value.length == 2 ? new Date(orderDate.value[1]).getTime() / 1000 : '';
        emit('search-handle', {
            username: username.value.trim(),
            phone: phone.value.trim(),
            starttime,
            endtime
        });
    };
</script>

<style scoped lang="scss">
    .search-wrapper{
        display: flex;
        justify-content: flex-end;
        padding: $side-padding;
        background-color: #fff;
        border-radius: 4px;
        .input {
            margin-left: $side-padding;
            width: 180px;
        }
        .date-picker {
            display: flex;
            margin-left: $side-padding;
            width: 350px;
        }
        .search-btn {
            margin-left: $side-padding;
        }
    }
</style>
