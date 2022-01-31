<template>
    <div class="col-xl-5 col-lg-6 col-md-7 block">
        <h1 class="h2"><b>Project</b></h1>
        <p class="lead">Создайте свою учетную запись</p>
        <div class="form-group" v-if="message">
            <span class="alert alert-danger">{{ message }}</span>
        </div>
        <form @submit.prevent="register">
            <div class="form-group">
                <div class="js-fields-area">
                    <div class="input" :class="{'is-invalid': errors.phone}">
                        <label>
                            <input type="tel" v-model="phone"/>
                            <span>Номер телефона</span>
                        </label>
                    </div>
                </div>
                <small class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</small>
            </div>
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
            </div>
            <div class="form-group">
                <div class="js-fields-area">
                    <div class="input" :class="{'is-invalid': errors.password}">
                        <label>
                            <input type="password" v-model="password"/>
                            <span>Пароль</span>
                        </label>
                    </div>
                </div>
                <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <div class="form-group">
                <div class="js-fields-area">
                    <div class="input" :class="{'is-invalid': errors.repeat_password}">
                        <label>
                            <input type="password" v-model="repeat_password"/>
                            <span>Повторите пароль</span>
                        </label>
                    </div>
                </div>
                <small class="text-danger" v-if="errors.repeat_password">{{ errors.repeat_password[0] }}</small>
            </div>
            <div class="form-group">
            <button class="btn btn-lg btn-block btn-primary" role="button" type="submit" :class="{'loading': loading}">
                Зарегистрироваться
            </button>
            </div>
            <div class="form-group">
                <span>Уже имеете учетную запись?
                <NuxtLink to="/auth/login">Вход</NuxtLink>
            </span>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "register",
        layout: "account/auth",
        auth: 'guest',
        data() {
            return {
                phone: '',
                email: '',
                password: '',
                repeat_password: '',
                loading: false,
                errors: {},
                message: ''
            }
        },

        watch: {
            repeat_password() {
                if (this.repeat_password !== this.password) {
                    if (this.errors.repeat_password) {
                        delete this.errors.repeat_password;
                    }
                    this.errors = Object.assign({}, this.errors, {repeat_password: ["Password mismatch"]});
                    this.loading = true;
                } else {
                    this.loading = false;
                    delete this.errors.repeat_password;
                }
            },
            password() {
                if (this.repeat_password !== this.password) {
                    if (this.errors.repeat_password) {
                        delete this.errors.repeat_password;
                    }
                    this.errors = Object.assign({}, this.errors, {repeat_password: ["Password mismatch"]});
                    this.loading = true;
                } else {
                    this.loading = false;
                    delete this.errors.repeat_password;
                }
            }
        },

        methods: {
            async register() {
                this.message = '';
                this.errors = {};
                this.loading = true;
                let response = (await this.$axios.post('/auth/register', {
                    phone: this.phone,
                    email: this.email,
                    password: this.password
                })).data;
                this.loading = false;
                if (!response.status) {
                    if (response.errors) {
                        this.errors = response.errors
                    } else {
                        this.message = response.message;
                    }
                    return false;
                }
                await this.$auth.setUserToken(response.data.user.token);
                await this.$auth.setUser(response.data.user);
                this.$router.go('/');
            }
        }
    }
</script>

<style scoped>

</style>
