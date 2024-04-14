<template>
    <div class="wrapper">
        <Search @search-handle="searchHandle" />
        <OrderStatus class="status-wrapper" @status-change="statusChangeEvent"/>
        <Table class="table" :tableData="tableData" :loading="loading" />
        <div class="pagination">
            <el-pagination layout="total, prev, pager, next, jumper"
                           v-model:current-page="pageNo" :page-size="pageSize" :total="pageTotal"
                           @current-change="pageChangeEvent"/>
        </div>
    </div>

</template>

<script setup>
    import {ref, computed} from 'vue';
    import {useStore} from 'vuex';
    import OrderApi from '@/api/OrderApi.js';
    import Search from './Search.vue';
    import OrderStatus from './OrderStatus.vue';
    import Table from './Table.vue';

    const username = ref('');
    const phone = ref('');
    const starttime = ref('');
    const endtime = ref('');
    const orderStatus = ref(-1);
    const loading = ref(true);
    const pageNo = ref(1);
    const pageSize = ref(15);
    const pageTotal = ref(0);
    const tableData = ref([]);

    const store = useStore();

    const accessToken = computed(() => store.state.__app_token__);

    const shortcuts = [
        {
            text: 'Last week',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
            },
        },
        {
            text: 'Last month',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
            },
        },
        {
            text: 'Last 3 months',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
            },
        },
    ];

    const searchHandle = searchData => {
        pageNo.value = 1;
        username.value = searchData.username;
        phone.value = searchData.phone;
        starttime.value = searchData.starttime;
        endtime.value = searchData.endtime;
        getList();
    };

    const statusChangeEvent = status => {
        pageNo.value = 1;
        orderStatus.value = status;
        getList();
    };

    const pageChangeEvent = page => {
        pageNo.value = page;
        getList();
    };

    const getList = () => {
        const options = {
            headers: {
                'X-ZUMO-AUTH': accessToken.value,
            },
            data: {
                pagenum: pageNo.value,
                pagesize: pageSize.value,
            }
        };
        if (username.value != '') {
            options.data.name = username.value;
        }
        if (phone.value != '') {
            options.data.phone = phone.value;
        }
        if (starttime.value != '') {
            options.data.starttime = starttime.value;
        }
        if (endtime.value != '') {
            options.data.endtime = endtime.value;
        }
        if (orderStatus.value !== -1) {
            options.data.status = orderStatus.value;
        }
        loading.value = true;
        OrderApi.list(options).then(d => {
            loading.value = false;
            tableData.value = d.list;
            pageTotal.value = d.total;
            console.log(d)
        }).catch(err => {
            loading.value = false;
            ElMessage({
                message: `${err}`,
                type: 'warning',
                plain: true,
            })
        });
    };
    getList({pagenum: pageNo.value, pagesize: pageSize.value});


</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .status-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
        padding: $side-padding;
        background-color: #fff;
        border-radius: 4px;
    }
    .table {
        flex: 1;
        user-select: auto !important;
        margin-top: 8px;
        border-radius: 4px;
    }
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: $side-padding;
    }
</style>
