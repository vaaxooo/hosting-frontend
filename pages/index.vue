<template>
    <div>
        <widgets-search :params="params"></widgets-search>
        <div class="row content p-0">
            <div class="col-md-8 vacancies-list">
                <div class="vacancies-empty" v-if="vacancies.length === 0">
                    <img src="/assets/landing/images/empty.png" width="50%"/>
                    <h5 class="vacancies-empty title">Список вакансий пуст.. Попробуйте изменить фильтр!</h5>
                </div>
                <widgets-vacancy-block v-else v-for="{_source: vacancy} in vacancies" :key="vacancy.id"
                                     :vacancy="vacancy"></widgets-vacancy-block>
                <div class="row mt-3">
                    <widgets-pagination :params="params"></widgets-pagination>
                </div>
            </div>
            <div class="col-md-4">
                <widgets-filters :params="params"></widgets-filters>
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
                params: [],


                page: this.$route.query?.page ? +this.$route.query?.page : 1,
                searchQueryString: this.$route.query?.searchQueryString ? this.$route.query?.searchQueryString : false,
                searchCity: this.$route.query?.searchCity ? this.$route.query?.searchCity : false,
                rubric: this.$route.query?.rubric ? this.$route.query?.rubric : false,
                scheduleId: this.$route.query?.scheduleId ? this.$route.query?.scheduleId : false,
                salaryFrom: this.$route.query?.salaryFrom ? this.$route.query?.salaryFrom : false
            }
        },
        created() {
            this.$nuxt.$on('filter', (data) => {
                this.rubric = data.rubric;
                this.scheduleId = data.scheduleId;
                this.salaryFrom = data.salaryFrom;
                this.$router.push({name: this.$route.name, query: data})
                this.getVacanciesList()
            })
            this.$nuxt.$on('search', (data) => {
                this.searchQueryString = data.searchQueryString;
                this.searchCity = data.searchCity;
                this.$router.push({name: this.$route.name, query: data})
                this.getVacanciesList()
            })
            this.$nuxt.$on('pagination', (data) => {
                this.page = data.page;
                this.$router.push({name: this.$route.name, query: data})
                this.getVacanciesList()
            })
        },
        async fetch() {
            await this.getVacanciesList()
        },
        methods: {
            async getVacanciesList() {
                const response = (await this.$axios.get('/vacancy/search', {
                    params: {
                        page: this.page,
                        searchQueryString: this.searchQueryString,
                        searchCity: this.searchCity,
                        rubric: this.rubric,
                        scheduleId: this.scheduleId,
                        salaryFrom: this.salaryFrom
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
    .vacancies-list {
        padding: 0!important;
    }
</style>
