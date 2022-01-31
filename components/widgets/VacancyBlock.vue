<template>
    <div class="vacancy-block" @click="redirect(+data.id)">
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
                            <b>{{ data.dateTxt }}</b>
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
</template>

<script>
    export default {
        name: "VacancyBlock",
        props: ['vacancy'],
        data() {
            return {
                data: []
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

</style>
