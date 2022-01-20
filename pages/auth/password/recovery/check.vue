<template>
    <div class="col-xl-5 col-lg-6 col-md-7 block">
        <h1 class="h2"><b>Project</b></h1>
        <p class="lead">Восстановление пароля</p>
        <div class="form-group" v-if="message">
            <span class="alert alert-danger">{{ message }}</span>
        </div>
        <form @submit.prevent="update">
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
            <button class="btn btn-lg btn-block btn-primary" role="button" type="submit" :class="{'loading': loading}">
                Изменить пароль
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "check",
        layout: "account/auth",
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
                this.$router.go('/');
            }
        }
    }
</script>

<style scoped>

</style>
