<template>
    <main class="form-signin">
        <form class="auth-block" @submit.prevent="reset">
            <h1 class="h3 mb-5 fw-normal">Восстановление пароля</h1>
            <span class="text-muted d-block">Код восстановления доступа будет выслан на указанную почту.</span>
            <div class="form-group" v-show="message">
                <span class="alert alert-danger">{{ message }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="email" class="form-control input" v-model="email" placeholder="name@example.com" :class="{'is-invalid': errors.email}" >
                <label>Эл. почта</label>
                <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>

            </div>

            <div class="form-group">
                <button class="w-100 btn btn-lg btn-blue" type="submit" :class="{'loading': loading}">Отправить код</button>
            </div>


            <p class="mt-5 mb-3 text-muted">Вспомнили пароль? <a href="/cabinet/auth/login" class="link">Вход</a></p>
        </form>
    </main>
</template>

<script>
    export default {
        name: "index",
        auth: 'guest',
        data() {
            return {
                email: '',
                loading: false,
                errors: {},
                message: ''
            }
        },
        methods: {
            async reset() {
                this.message = '';
                this.errors = {};
                this.loading = true;
                let response = (await this.$axios.post('/auth/password/recovery', {
                    email: this.email,
                })).data;
                this.loading = false;
                if (!response.status) {
                    if (response.errors) {
                        this.errors = response.errors
                    }
                    return false;
                }

                this.message = response.message;
            }
        }
    }
</script>

<style scoped>

</style>
