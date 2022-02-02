<template>
    <main class="form-signin">
        <form class="auth-block" @submit.prevent="auth">
            <h1 class="h3 mb-5 fw-normal">Вход в личный кабинет</h1>

            <div class="form-group" v-show="message">
                <span class="alert alert-danger">{{ message }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="email" class="form-control input" v-model="email" placeholder="name@example.com" :class="{'is-invalid': errors.email}" >
                <label>Эл. почта или телефон</label>
                <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="password" class="form-control input" v-model="password" placeholder="Password" :class="{'is-invalid': errors.password}">
                <label>Пароль</label>
                <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>

            <div class="mb-3">
                <a href="/cabinet/auth/recovery" class="link">Забыли пароль?</a>
            </div>

            <div class="form-group">
                <button class="w-100 btn btn-lg btn-blue" type="submit" :class="{'loading': loading}">Войти</button>
            </div>


            <p class="mt-5 mb-3 text-muted">Ещё не зарегистрированы? <a href="/cabinet/auth/register" class="link">Регистрация</a></p>
        </form>
    </main>
</template>

<script>
    export default {
        name: "login",
        auth: 'guest',
        data() {
            return {
                email: '',
                password: '',
                loading: false,
                errors: {},
                message: ''
            }
        },
        methods: {
            async auth() {
                this.message = '';
                this.errors = {};
                this.loading = true;
                let response = (await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })).data;
                this.loading = false;
                if(!response.status) {
                    if(response.errors) {
                        this.errors = response.errors
                    } else {
                        this.message = response.message;
                    }
                    return false;
                }
                await this.$auth.setUserToken(response.data.user.token);
                await this.$auth.setUser(response.data.user);
                this.$router.push({path: '/'});
            }
        }
    }
</script>

<style scoped>

</style>
