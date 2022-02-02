<template>
    <main class="form-signin">
        <form class="auth-block" @submit.prevent="update">
            <h1 class="h3 mb-5 fw-normal">Восстановление пароля</h1>
            <div class="form-group" v-show="message">
                <span class="alert alert-danger">{{ message }}</span>
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
                <button class="w-100 btn btn-lg btn-blue" type="submit" :class="{'loading': loading}">Изменить пароль</button>
            </div>
        </form>
    </main>
</template>

<script>
    export default {
        name: "check",
        auth: 'guest',
        data() {
            return {
                password: '',
                repeat_password: '',

                loading: false,
                message: '',
                errors: {}
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
        async mounted() {
            await this.check()
        },
        methods: {
            async check() {
                this.loading = true;
                const response = await this.$axios.post('/auth/password/recovery/check', {
                    code: this.$route.query.code,
                    email: this.$route.query.email
                });
                if(response.data.status === false) {
                    this.message = response.data.message;
                    return false;
                }
                this.loading = false;
                return false;
            },

            async update() {
                this.message = '';
                this.errors = {};
                this.loading = true;
                const response = (await this.$axios.put('/auth/password/recovery/verified', {
                    code: this.$route.query.code,
                    email: this.$route.query.email,
                    password: this.password
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
                this.$router.push({path: '/'});
            }
        }
    }
</script>

<style scoped>

</style>
