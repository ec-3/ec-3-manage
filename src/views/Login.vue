<template>
    <main class="container">
        <div class="g_id_signin" id="g_id_signin"></div>
        <div class="err-msg" v-if="isError">
            <h2 class="title"><el-icon class="icon"><WarnTriangleFilled /></el-icon>Tips</h2>
            <p class="content">Please check your network.</p>
        </div>
    </main>
</template>

<script setup>
    import {onBeforeMount, onMounted, ref} from 'vue';
    import {useStore} from 'vuex';
    import {useRouter} from 'vue-router';
    const GOOGLE_CLIENT_ID = '394621226423-koka0qfg41sl3489j9vqap586sdf69r6.apps.googleusercontent.com';
    import LoginApi from '@/api/LoginApi.js';

    const store = useStore();
    const router = useRouter();

    const isError = ref(false);

    onMounted(() => {
        // 使用谷歌登录的api
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client"
        document.body.appendChild(script);
        window.addEventListener('load', () => {
            if (window.google) {
                isError.value = false;
                window.google.accounts.id.initialize({
                    // 主要就是填写client_id
                    client_id: GOOGLE_CLIENT_ID,
                    auto_select: false,
                    // scope: "email",
                    callback: handleCredentialResponse,
                });
                // 设置按钮的样式等
                window.google.accounts.id.renderButton(
                    document.getElementById("g_id_signin"),
                    {
                        theme: "filled_blue",
                        size: 'large',
                        width: '320',
                        type: 'standard',
                        text: 'signin_with'
                    }
                );
                // window.google.accounts.id.prompt();
            } else {
                isError.value = true
            }
        })
    });


    const handleCredentialResponse = response => {
        const jwtCode = response.credential
        LoginApi.getAccessToken({id_token: jwtCode}).then(d => {
            store.dispatch('setApp', {token: d.authenticationToken});
            console.log(router)
            router.push('/');
        }).catch(e => {
            ElMessage({
                message: `${e}`,
                type: 'warning',
                plain: true,
            })
        });
    };
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .err-msg {
        padding: 15px;
        background-color: #fffbe6;
        border: 1px solid #ffe58f;
        .title {
            display: flex;
            align-items: center;
            line-height: $line-height;
            font-size: $size-mder;
            color: rgba(0, 0, 0, .85);
            .icon {
                margin-right: 4px;
                font-size: $size-mder;
                font-size: $size-lg;
            }
        }
        .content {
            margin-top: 4px;
            line-height: $line-height;
            font-size: $size-md;
        }
    }
</style>


