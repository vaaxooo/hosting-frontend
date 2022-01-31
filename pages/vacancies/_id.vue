<template>
    <div class="row mt-5">
        <div class="col-md-8 content">
            <div class="vacancyinfo-block">
                <div class="vacancyinfo-banner">
                    <img :src="vacancy.designBannerFullUrl" class="banner-preview"/>
                </div>
                <div class="date-publication">
                    Опубликовано {{ vacancy.dateTxt }} - {{vacancy.date}}
                </div>
                <div class="vacancy-title mt-3">
                    {{ vacancy.name }}
                </div>
                <div class="vacancyinfo-subtitle">
                    <div class="row">
                        <div class="col-md-4">
                            Город: <b>{{ vacancy.cityName }}</b>
                        </div>
                        <div class="col-md-8">
                            Зарплата:
                            <b v-if="vacancy.salaryFrom && vacancy.salaryTo">{{ vacancy.salaryFrom }}-{{ vacancy.salaryTo }} грн.</b>
                            <b v-else-if="vacancy.salaryFrom && !vacancy.salaryTo">от {{ vacancy.salaryFrom }} грн.</b>
                            <b v-else-if="!vacancy.salaryFrom && vacancy.salaryTo">до {{ vacancy.salaryTo }} грн.</b>
                            <b v-else-if="!vacancy.salaryFrom && !vacancy.salaryTo && vacancy.salary > 0">{{ vacancy.salary }} грн.</b>
                            <b v-else-if="!vacancy.salaryFrom && !vacancy.salaryTo && !vacancy.salary">по договорености</b>
                            <b v-if="vacancy.salaryComment">({{ vacancy.salaryComment }})</b>
                        </div>
                    </div>
                </div>
                <div class="vacancyinfo-badges" v-if="vacancy.badges">
                    <strong class="d-block">Приемущества вакансии</strong>
                    <span class="vacancyinfo-badges-tag" v-for="badge in vacancy.badges" :key="badge.id">{{ badge.name }}</span>
                </div>
                <div class="vacancyinfo-description" v-html="vacancy.description"></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="vacancyinfo-company-block mb-4" v-if="vacancy.contactPhone">
                <div class="company-image">
                    <img :src="'https://vacancy-contact-photos-original.rabota.ua/' + vacancy.logo"
                         class="company-image-preview rounded-circle"/>
                </div>
                <div class="company-information">
                    <strong>
                        Контактное лицо
                    </strong>
                    <span class="company-name" v-if="vacancy.contactPerson">
                            <span class="material-icons icon">account_circle</span>
                            {{ vacancy.contactPerson }}
                        </span>
                    <span class="company-phone" v-if="vacancy.contactPhone">
                            <span class="material-icons icon">settings_cell</span>
                            {{ vacancy.contactPhone }}
                        </span>
                    <div class="company-website" v-if="vacancy.contactURL">
                        <span class="material-icons icon">link</span>
                        <a :href="vacancy.contactURL">
                            {{ vacancy.contactURL }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="recommended-vacancies-block" v-if="recommendedVacancies.length > 0">
                <div class="title">
                    Похожие вакансии
                </div>
                <div class="vacancies list-group">
                    <a v-for="{_source: recommendedVacancy} in recommendedVacancies" :href="'/vacancies/' + recommendedVacancy.id"
                       class="list-group-item list-group-item-action recommended-vacancy">
                        <div class="vacancies-block">
                            <div class="vacancy-recommended-title">
                                {{ recommendedVacancy.name }}
                                <span class="material-icons hot-icon text-danger" title="Гарячая вакансия"
                                      v-if="recommendedVacancy.hot">local_fire_department</span>
                            </div>
                            <span class="row">
                                    <div class="col-md-6">
                                        <span class="material-icons icon">location_city</span> {{ recommendedVacancy.companyName }}
                                    </div>
                                    <div class="col-md-6">
                                        <span class="material-icons icon">fmd_good</span> {{ recommendedVacancy.cityName }}
                                    </div>
                                </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vacancy",
        layout: "default",
        auth: 'guest',
        data() {
            return {
                vacancy: [],
                recommendedVacancies: []
            }
        },
        async fetch() {
            await this.getVacancyData()
        },
        methods: {
            async getVacancyData() {
                const response = (await this.$axios.get(`/vacancy/${this.$route.params.id}`)).data;
                if (response.status) {
                    this.vacancy = response.data[0]._source;
                    this.recommendedVacancies = response.recommendedVacancies;
                }
            }
        }
    }
</script>

<style scoped>

</style>