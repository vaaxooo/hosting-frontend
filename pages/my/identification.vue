<template>
    <div>
        <h2 class="h1 mb-5">Персональные данные</h2>

        <div class="block mt-3">

            <form @submit.prevent="save">
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="title">Персональные данные</h4>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.first_name}">
                                    <label>
                                        <input type="text" v-model="identification.person.first_name"/>
                                        <span>Имя</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.first_name">{{ errors.first_name[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.last_name}">
                                    <label>
                                        <input type="text" v-model="identification.person.last_name"/>
                                        <span>Фамилия</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.last_name">{{ errors.last_name[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.surname}">
                                    <label>
                                        <input type="text" v-model="identification.person.surname"/>
                                        <span>Отчество</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.surname">{{ errors.surname[0] }}</small>
                        </div>
                        <h4 class="title mt-3">Адрес</h4>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.country}">
                                    <label>
                                        <input type="text" v-model="identification.address.country"/>
                                        <span>Страна</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.country">{{ errors.country[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.region}">
                                    <label>
                                        <input type="text" v-model="identification.address.region"/>
                                        <span>Область</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.region">{{ errors.region[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.city}">
                                    <label>
                                        <input type="text" v-model="identification.address.city"/>
                                        <span>Город</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.city">{{ errors.city[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.index}">
                                    <label>
                                        <input type="text" v-model="identification.address.index"/>
                                        <span>Индекс</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.index">{{ errors.index[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.address}">
                                    <label>
                                        <input type="text" v-model="identification.address.address"/>
                                        <span>Адрес</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.address">{{ errors.address[0] }}</small>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <h4 class="title">Паспортные данные</h4>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.passport_id}">
                                    <label>
                                        <input type="text" v-model="identification.passport.passport_id" />
                                        <span>Серия и номер паспорта</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.passport_id">{{ errors.passport_id[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.passport_issued}">
                                    <label>
                                        <input type="text" v-model="identification.passport.passport_issued" />
                                        <span>Кем выдан</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.passport_issued">{{ errors.passport_issued[0] }}</small>
                        </div>
                        <div class="form-group">
                            <div class="js-fields-area">
                                <div class="input" :class="{'is-invalid': errors.date_of_issue}">
                                    <label>
                                        <input type="text" v-model="identification.passport.date_of_issue"/>
                                        <span>Дата выдачи</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-danger" v-if="errors.date_of_issue">{{ errors.date_of_issue[0] }}</small>
                        </div>
                        <div class="form-group mt-3">
                            <button type="submit" class="btn btn-block btn-lg btn-primary">Отправить на проверку
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "identification",
        data() {
            return {
                identification: {
                    person: {
                        first_name: '',
                        last_name: '',
                        surname: ''
                    },
                    address: {
                        country: '',
                        region: '',
                        city: '',
                        index: '',
                        address: ''
                    },
                    passport: {
                        passport_id: '',
                        passport_issued: '',
                        date_of_issue: ''
                    }
                },
                message: '',
                status: false,
                errors: {},
                loading: false
            }
        },
        methods: {
            async save() {
                this.message = '';
                this.status = false;
                this.errors = {};
                this.loading = true;
                let response = (await this.$axios.put('/account/verified', {
                    first_name: this.identification.person.first_name,
                    last_name: this.identification.person.last_name,
                    surname: this.identification.person.surname,
                    country: this.identification.address.country,
                    region: this.identification.address.region,
                    city: this.identification.address.city,
                    index: this.identification.address.index,
                    address: this.identification.address.address,
                    passport_id: this.identification.passport.passport_id,
                    passport_issued: this.identification.passport.passport_issued,
                    date_of_issue: this.identification.passport.date_of_issue
                })).data;
                this.loading = false;
                if (!response.status) {
                    if (response.errors) {
                        this.errors = response.errors
                    }
                    return false;
                }
                this.$router.go('/my/settings/');
            }
        }
    }
</script>

<style scoped>

</style>