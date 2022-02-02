<template>
    <main class="form-signin">
        <form class="auth-block" @submit.prevent="register">
            <h1 class="h3 mb-5 fw-normal">Создайте свою учетную запись</h1>

            <div class="form-group" v-show="message">
                <span class="alert alert-danger">{{ message }}</span>
            </div>

            <div class="form-floating auth-input">
                <VuePhoneNumberInput
                    v-model="phone"
                    :class="{'is-invalid': errors.phone} + 'form-control'"
                    border-radius="0"
                    label="Номер телефона" />

                <span class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="email" class="form-control input" v-model="email" placeholder="name@example.com" :class="{'is-invalid': errors.email}" >
                <label>E-mail</label>
                <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="password" class="form-control input" v-model="password" placeholder="Password" :class="{'is-invalid': errors.password}">
                <label>Придумайте пароль</label>
                <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>

            <div class="form-floating auth-input">
                <input type="password" class="form-control input" v-model="repeat_password" placeholder="Password" :class="{'is-invalid': errors.repeat_password}">
                <label>Повторите пароль</label>
                <span class="text-danger" v-if="errors.repeat_password">{{ errors.repeat_password[0] }}</span>
            </div>

            <div class="form-group">
                <button class="w-100 btn btn-lg btn-blue" type="submit" :class="{'loading': loading}">Зарегистрироваться</button>
            </div>


            <p class="mt-5 mb-3 text-muted">Имеете учетную запись? <a href="/cabinet/auth/login" class="link">Вход</a></p>
        </form>
    </main>
</template>


<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import '~/static/assets/css/phone-number.css';

    export default {
        name: "register",
        components: {VuePhoneNumberInput},
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
