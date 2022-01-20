<template>
    <div>
        <h2 class="h1 mb-5">Настройки</h2>

        <div class="block">
            <div class="identification-block" v-if="this.$auth.user.verified">
                <h5 class="mb-0 title">Персональные данные <span class="badge badge-verified"><i class="fas fa-check"></i> Подтверждены</span></h5>
                <div class="bg-light p-3 rounded mb-3 mt-3">
                    <table role="table" aria-busy="false" aria-colcount="2"
                           class="table b-table mb-0 table-padding-xs table-borderless table-sm" id="__BVID__82">
                        <thead role="rowgroup" class="d-none">
                        <tr role="row" class="">
                            <th role="columnheader" scope="col" aria-colindex="1" class="w-25">
                                <div>Label</div>
                            </th>
                            <th role="columnheader" scope="col" aria-colindex="2" class="">
                                <div>Value</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody role="rowgroup" class="font-size-sm"><!---->
                        <tr role="row" class="">
                            <td aria-colindex="1" role="cell" class="w-25">ФИО</td>
                            <td aria-colindex="2" role="cell" class="">{{ this.$auth.user.first_name + " " + this.$auth.user.last_name }}</td>
                        </tr>
                        <tr role="row" class="">
                            <td aria-colindex="1" role="cell" class="w-25">Адрес проживания</td>
                            <td aria-colindex="2" role="cell" class="">{{ this.$auth.user.index }}, {{ this.$auth.user.country }}, {{ this.$auth.user.city }}, {{ this.$auth.user.address }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p class="font-size-sm text-muted">
                <span>
                    <i class="fas fa-info-circle"></i>
                    Для изменения персональных данных создайте запрос в <NuxtLink
                        to="/my/tickets/new/">службу поддержки</NuxtLink>
                </span>
                </p>
            </div>

            <div class="identification-block identification d-flex" v-else>
                <img src="/assets/img/identification.png" width="54px" class="identification-image">
                <div class="identification-desc">
                    <h5 class="identification-title">
                        Идентификация
                    </h5>
                    <span class="identification-description">Для использования услуг, вам нужно <NuxtLink to="/my/identification">подтвердить</NuxtLink> персональные данные.</span>
                </div>
            </div>

            <hr>
            <h5 class="mb-0 title">E-mail и пароль</h5>
            <div class="col-12 col-md-6 pl-0 mt-3">
                <div class="row align-items-center">
                    <div class="col-sm-3"><label class="mb-0">E-mail</label></div>
                    <div class="col-sm-9">
                        vaaxooo@gmail.com
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-sm-3"><label class="mb-0">Пароль</label></div>
                    <div class="col-sm-9">
                        <button type="button" class="btn pl-0 btn-link" @click="modal = true">
                            изменить пароль
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade show" tabindex="-1" aria-hidden="true" style="display: block;" v-if="modal">
            <div class="modal-overlay"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title">Изменить пароль</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                @click="modal = false">
                            <img src="/assets/img/icons/close.png" width="24px"/>
                        </button>
                    </div>
                    <form @submit.prevent="update">
                        <div class="modal-body">
                            <div class="form-group" v-if="message">
                                <span class="alert alert-success" v-if="status">{{ message }}</span>
                                <span class="alert alert-danger" v-if="!status">{{ message }}</span>
                            </div>
                            <div class="form-group">
                                <div class="js-fields-area" :class="{'is-invalid': errors.current_password}">
                                    <div class="input">
                                        <label>
                                            <input type="password" v-model="current_password"/>
                                            <span>Текущий пароль</span>
                                        </label>
                                    </div>
                                </div>
                                <small class="text-danger" v-if="errors.current_password">{{ errors.current_password[0]
                                    }}</small>
                            </div>
                            <div class="form-group">
                                <div class="js-fields-area">
                                    <div class="input" :class="{'is-invalid': errors.password}">
                                        <label>
                                            <input type="password" v-model="password"/>
                                            <span>Новый пароль</span>
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
                                            <span>Повторите новый пароль</span>
                                        </label>
                                    </div>
                                </div>
                                <small class="text-danger" v-if="errors.repeat_password">{{ errors.repeat_password[0]
                                    }}</small>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal" @click="modal = false">
                                Отмена
                            </button>
                            <button type="submit" class="btn btn-primary" :class="{'loading': loading}">Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settings",
        layout: "account/default",
        data() {
            return {
                current_password: '',
                password: '',
                repeat_password: '',

                modal: false,
                loading: false,
                errors: {},
                message: '',
                status: false
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
            async update() {
                this.message = '';
                this.status = false;
                this.errors = {};
                this.loading = true;
                let response = (await this.$axios.put('/account/password/change', {
                    current_password: this.current_password,
                    password: this.password
                })).data;
                this.loading = false;
                if (!response.status) {
                    if (response.errors) {
                        this.errors = response.errors
                    }
                }
                this.status = response.status;
                this.message = response.message;
                if (response.status) {
                    this.current_password = '',
                    this.password = '',
                    this.repeat_password = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
