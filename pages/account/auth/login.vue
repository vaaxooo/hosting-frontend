<template>
    <div class="col-xl-5 col-lg-6 col-md-7 block">
            <h1 class="h2"><b>Project</b></h1>
            <p class="lead">Войдите в свою учетную запись, чтобы продолжить</p>
            <div class="form-group" v-if="message">
                <span class="alert alert-danger">{{ message }}</span>
            </div>
            <form @submit.prevent="auth">
                <div class="form-group">
                    <div class="js-fields-area">
                        <div class="input" :class="{'is-invalid': errors.email}">
                            <label>
                                <input type="email" v-model="email"  />
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
                    <div class="text-right">
                        <span>
                            <NuxtLink to="/auth/password/recovery">Забыли пароль?</NuxtLink>
                        </span>
                    </div>
                </div>
                <button class="btn btn-lg btn-block btn-primary" role="button" type="submit" :class="{'loading': loading}">
                    Войти
                </button>
                <span>У вас еще нет учетной записи? <NuxtLink to="/auth/register">Создать</NuxtLink>
                </span>
            </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        layout: "account/auth",
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
                this.$router.go('/my/announcement');
            }
        }
    }
</script>
