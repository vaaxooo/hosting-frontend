<template>
    <div class="row block-search">
        <div class="row py-5">
            <div class="block-search-title">
                Помогаем найти работу, с которой жизнь будет в радость

                <span class="block-search-subtitle" v-if="params.type === 'search' && params.total === 0">По запросу "<b>{{params.query}}</b>" вакансий не найдено!</span>
                <span class="block-search-subtitle" v-else-if="params.type === 'search' && params.query">По запросу "<b>{{params.query}}</b>" найдено <b>{{params.total}}</b> актуальних вакансий.</span>
                <span class="block-search-subtitle" v-else>Сейчас у нас <b>{{params.total}}</b> актуальних вакансий.</span>
            </div>
            <div class="input-group">
                <div class="col-md-7">
                    <input type="text" class="form-control form-control-lg input-search" placeholder="Кем хотите работать?" @focus="focusVacancy" v-model="searchQueryString" required/>
                    <div class="list-group vacancy-clue" v-if="clues.length > 0" v-show="vacancy_clue_visible">
                        <span class="text-muted">Возможно вы ищите следующее:</span>
                        <a href="#" class="list-group-item list-group-item-action clue" v-for="{_source: clue} in clues" :key="clue.id" @click="changeSearch(clue.ru)">{{ clue.ru }}</a>
                    </div>
                    <span class="input-search-subtitle">Например: бухгалтер, продажи и т.п</span>
                </div>
                <div class="col-md-4" >
                    <input type="text" class="form-control form-control-lg input-search-city" placeholder="Начните вводить название города" @focus="focusCity" v-model="searchCity">
                    <div class="list-group vacancy-clue" v-if="clues.length > 0" v-show="city_clue_visible">
                        <span class="text-muted">Возможно вы ищите следующее:</span>
                        <a href="#" class="list-group-item list-group-item-action clue" v-for="{_source: clue} in clues" :key="clue.id" @click="changeCity(clue.ru)">{{ clue.ru }}</a>
                    </div>
                </div>
                <div class="col-md-1">
                    <button type="submit" class="btn btn-blue btn-block btn-lg" @click="changeFilterParams">Найти</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Search",
        props: ['params'],
        data() {
            return {
                cities: [],
                stats: [],

                searchQueryString: this.$route.query.searchQueryString || '',
                searchCity: this.$route.query.searchCity || '',

                clues: [],
                city_clue_visible: false,
                vacancy_clue_visible: false
            }
        },
        watch: {
            async searchQueryString() {
                if(this.searchQueryString.length > 1 && this.searchQueryString.length < 15){
                    let response = (await this.$axios.get('/dictionary/clues/rubrics', {
                        params: {
                            request: this.searchQueryString
                        }
                    })).data;
                    if(response.status) {
                        this.clues = response.data
                    }
                }
            },
            async searchCity() {
                if(this.searchCity.length > 1 && this.searchCity.length < 15){
                    let response = (await this.$axios.get('/dictionary/clues/cities', {
                        params: {
                            request: this.searchCity
                        }
                    })).data;
                    if(response.status) {
                        this.clues = response.data
                    }
                }
            }
        },
        async fetch() {
            this.stats = this.params
        },
        methods: {
            async changeFilterParams() {
                let object = {...this.$route.query}
                object.searchQueryString = this.searchQueryString;
                object.searchCity = this.searchCity;
                this.$nuxt.$emit('search', object)
            },

            changeCity(city) {
                this.searchCity = city;
                this.city_clue_visible = false;
            },

            changeSearch(request) {
                this.searchQueryString = request;
                this.vacancy_clue_visible = false;
            },

            focusCity() {
                this.clues = [];
                this.city_clue_visible = true;
                this.vacancy_clue_visible = false;
            },

            focusVacancy() {
                this.clues = [];
                this.city_clue_visible = false;
                this.vacancy_clue_visible = true;
            }
        }
    }
</script>

<style scoped>

</style>
