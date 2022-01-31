<template>
    <div>
        <widgets-search :params="params"></widgets-search>
        <div class="row content">
            <div class="col-md-8 vacancies-list">
                <div class="vacancies-empty" v-if="vacancies.length === 0">
                    <img src="/images/empty.png" width="50%"/>
                    <h5 class="vacancies-empty title">Список вакансий пуст.. Попробуйте изменить фильтр!</h5>
                </div>
                <widgets-vacancy-block v-else v-for="{_source: vacancy} in vacancies"
                                     :vacancy="vacancy"></widgets-vacancy-block>
                <div class="row mt-3">
                    <widgets-pagination></widgets-pagination>
                </div>
            </div>
            <div class="col-md-4">
                <widgets-filter :params="params"></widgets-filter>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        layout: "default",
        auth: 'guest',
        data() {
            return {
                vacancies: [],
                params: []
            }
        },
        async fetch() {
            await this.getVacanciesList()
        },
        methods: {
            async getVacanciesList() {
                const response = (await this.$axios.get('/vacancy/search', {
                    params: {
                        page: this.$route.params?.page ? +this.$route.params?.page : 1,
                        searchQueryString: this.$route.query?.searchQueryString ? this.$route.query?.searchQueryString : false,
                        searchCity: this.$route.query?.searchCity ? this.$route.query?.searchCity : false,
                        rubric: this.$route.query?.rubric ? this.$route.query?.rubric : false,
                        scheduleId: this.$route.query?.scheduleId ? this.$route.query?.scheduleId : false,
                        salaryFrom: this.$route.query?.salaryFrom ? this.$route.query?.salaryFrom : false
                    }
                })).data;
                if (response.status) {
                    this.vacancies = response.data;
                    this.params = response.statistic;
                }
            }
        }
    }
</script>

<style scoped>

</style>
