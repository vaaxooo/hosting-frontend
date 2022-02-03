<template>
    <NuxtLink :to="{name: 'vacancies-id', params: { id: +data.id}}" class="vacancy">
    <div class="vacancy-block">
        <div class="vacancy-title">
            {{ data.name }}
            <span class="material-icons hot-icon text-danger" title="Гарячая вакансия" v-if="data.hot">local_fire_department</span>
        </div>
        <div class="vacancy-info row">
            <div class="col-md-5">
                        <span class="vacancy-company">
                            <span class="material-icons icon">location_city</span>
                            <b>{{ data.companyName || 'не указана' }}</b>
                        </span>
            </div>
            <div class="col-md-7">
                        <span class="vacancy-city">
                            <span class="material-icons icon">access_time_filled</span>
                            <b>{{ moment(data.date).fromNow() }}</b>
                        </span>
            </div>
        </div>
        <div class="vacancy-subtitle row">
            <div class="col-md-5">
                        <span class="vacancy-date-publication">
                            <span class="material-icons icon">fmd_good</span>
                            <b>{{ data.cityName || 'не указан' }}</b>
                        </span>
            </div>
            <div class="col-md-7">
                <span class="vacancy-salary">
                    <span class="material-icons icon">attach_money</span>
                    <b v-if="data.salaryFrom && data.salaryTo">{{ data.salaryFrom }}-{{ data.salaryTo }} грн.</b>
                    <b v-else-if="data.salaryFrom && !data.salaryTo">от {{ data.salaryFrom }} грн.</b>
                    <b v-else-if="!data.salaryFrom && data.salaryTo">до {{ data.salaryTo }} грн.</b>
                    <b v-else-if="!data.salaryFrom && !data.salaryTo && data.salary > 0">{{ data.salary }} грн.</b>
                    <b v-else-if="!data.salaryFrom && !data.salaryTo && !data.salary">по договорености</b>
                    <b v-if="data.salaryComment">({{ data.salaryComment }})</b>
                </span>
            </div>
        </div>
        <div class="vacancy-short-description">
            {{ data.shortDescription }}
            <div class="vacancy-tags">
                <span class="tag" v-for="badge in data.badges" :key="badge.id">{{ badge.name }}</span>
            </div>

            <div class="vacancy-banner row" v-if="data.banner">
                <img :src="data.banner" alt="banner" class="vacancy-banner-preview"/>
            </div>

        </div>
    </div>
    </NuxtLink>
</template>

<script>
    import moment from 'moment';
    import 'moment/locale/ru';

    export default {
        name: "VacancyBlock",
        props: ['vacancy'],
        data() {
            return {
                data: [],
                moment: moment
            }
        },
        async fetch() {
            this.data = this.vacancy
        },
        methods: {
            redirect(id) {
                this.$router.push({name: "vacancies-id", params: {id: id}})
            }
        }
    }
</script>

<style scoped>
    .vacancy-block:first-child {
        border-radius: 0px;
        padding: 40px;
        border: 1px solid #e9ecef;
    }

    .vacancy-block {
        border-radius: 0px;
        padding: 40px;
        border: 1px solid #e9ecef;
        border-top: 0;
    }

    .vacancy-block:hover {
        background: #f8f9fa;
        border: 1px solid #abb2ba;
        cursor: pointer;
        z-index: 11;
    }
</style>
