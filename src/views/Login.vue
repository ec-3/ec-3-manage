<template>
    <main class="container">
        <div class="g_id_signin" id="g_id_signin"></div>
    </main>
</template>

<script>
const GOOGLE_CLIENT_ID = '394621226423-koka0qfg41sl3489j9vqap586sdf69r6.apps.googleusercontent.com';

export default {
    data() {
        return {
        }
    },
    mounted() {
        // 使用谷歌登录的api
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client"
        document.body.appendChild(script);
        window.addEventListener('load', () => {
            window.google.accounts.id.initialize({
                // 主要就是填写client_id
                client_id: GOOGLE_CLIENT_ID,
                auto_select: false,
                callback: this.handleCredentialResponse,
            });
            // 设置按钮的样式等
            window.google.accounts.id.renderButton(
                document.getElementById("g_id_signin"),
                {
                    theme: "filled_blue",
                    size: 'large',
                    width:'320',
                    type: 'standard',
                    text: 'signin_with'
                }
            );
        })
    },
    methods: {
        async handleCredentialResponse(response) {
            let code = response.credential
            await api.googleLogin(code);
        },
    }
}
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>


