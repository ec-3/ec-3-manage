<template>
    <el-table v-loading="loading" :data="tableData"
              table-layout="auto" empty-text=" " :border="true">
        <el-table-column type="expand">
            <template #default="props">
                <div class="row-child">
                    <div class="row-child__item">
                        <label class="label">Name :</label>
                        <span class="text">{{ props.row.Name }}</span>
                    </div>
                    <div class="row-child__item">
                        <label class="label">Email :</label>
                        <span class="text">{{ props.row.Email }}</span>
                    </div>
                    <div class="row-child__item">
                        <label class="label">Tel :</label>
                        <span class="text">{{ props.row.Phone }}</span>
                    </div>
                    <div class="row-child__item">
                        <label class="label">Postcode / ZIP :</label>
                        <span class="text">{{ props.row.ZipCode }}</span>
                    </div>
                    <div class="row-child__item" v-if="props.row.CompanyName">
                        <label class="label">Company name :</label>
                        <span class="text">{{ props.row.CompanyName }}</span>
                    </div>
                </div>
                <div class="row-child">
                    <div class="row-child__item">
                        <label class="label">Country / Region:</label>
                        <span class="text">{{ props.row.Country }}</span>
                    </div>
                    <div class="row-child__item">
                        <label class="label">Province:</label>
                        <span class="text">{{ props.row.Province }}</span>
                    </div>
                    <div class="row-child__item">
                        <label class="label">Town / City:</label>
                        <span class="text">{{ props.row.City }}</span>
                    </div>
                </div>
                <div class="row-child">
                    <div class="row-child__item">
                        <label class="label">Street:</label>
                        <span class="text">{{ props.row.Street }}</span>
                    </div>
                </div>
                <div class="row-child">
                    <div class="row-child__item">
                        <label class="label">Address:</label>
                        <span class="text">{{ props.row.Address }}</span>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="#">
            <template type="index" #default="scope">
                <div style="text-align: center">{{ scope.$index + 1 }}</div>
            </template>
        </el-table-column>
        <el-table-column prop="PaymentID" label="Order No"/>
        <el-table-column prop="ProductName" label="Product Name"/>
        <el-table-column label="Order Date">
            <template #default="scope">
                <div style="text-align: center">{{ scope.row.CreateTime }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Quantity">
            <template #default="scope">
                <div style="text-align: center">{{ scope.row.Quantity }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Total Paid">
            <template #default="scope">
                <div style="text-align: center">{{ scope.row.Amount }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Status">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="left" width="auto">
                    <template #default>
                        {{ scope.row.StatusDesc }}
                    </template>
                    <template #reference>
                        <div style="text-align: center; cursor: pointer">
                            <el-tag v-if="['Created'].includes(scope.row.StatusText)"
                                    class="default" type="primary" size="large">{{ scope.row.StatusText }}
                            </el-tag>
                            <el-tag v-else-if="['Paid', 'Notified', 'Shipped'].includes(scope.row.StatusText)"
                                    type="primary" size="large">{{ scope.row.StatusText }}
                            </el-tag>
                            <el-tag v-else-if="['Received'].includes(scope.row.StatusText)"
                                    type="success" size="large">{{ scope.row.StatusText }}
                            </el-tag>
                            <el-tag v-else-if="['Failed'].includes(scope.row.StatusText)" type="warning" size="large">{{
                                scope.row.StatusText }}
                            </el-tag>
                            <el-tag v-else  class="default"  size="large">{{ scope.row.StatusText }}</el-tag>
                        </div>
                    </template>
                </el-popover>
            </template>

        </el-table-column>
    </el-table>
</template>

<script setup>
    import {defineProps} from 'vue';

    const props = defineProps({
        tableData: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: true
        }
    });
</script>

<style scoped lang="scss">
    .row-child {
        display: flex;
        margin-right: 6px;
        padding: $side-padding $side-padding $side-padding 100px;
        user-select: text;
        box-sizing: border-box;
        &:last-child {
            border-bottom: 1px solid $color-text-placeholder;
        }
        .row-child__item {
            padding: 4px 20px;
            color: $color-text-regular;
            .label {
                margin-right: 8px;
                font-size: $size-md;
                font-weight: 700;
            }
            .text {
                font-size: $size-md;
            }
        }
    }
    :deep(.el-tag.default) {
        color: $color-text-regular;
        background-color: #fff;
    }
</style>
