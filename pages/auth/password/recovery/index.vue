<template>
    <div class="col-xl-5 col-lg-6 col-md-7 block">
        <h1 class="h2"><b>Project</b></h1>
        <p class="lead">Восстановление пароля</p>
        <div class="form-group" v-if="message">
            <span class="alert alert-success">{{ message }}</span>
        </div>
        <form @submit.prevent="reset">
            <div class="form-group">
                <div class="js-fields-area">
                    <div class="input" :class="{'is-invalid': errors.email}">
                        <label>
                            <input type="email" v-model="email"/>
                            <span>E-mail</span>
                        </label>
                    </div>
                </div>
                <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                <span class="text-muted d-block">Код восстановления доступа будет выслан на указанную почту.</span>
            </div>
            <div class="form-group">
                <button class="btn btn-lg btn-block btn-primary" role="button" type="submit">
                    Отправить код
                </button>
            </div>
            <div class="form-group">
                <span>Вспомнили пароль?
                    <NuxtLink to="/auth/login">Вход</NuxtLink>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "index",
        layout: "account/auth",
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
