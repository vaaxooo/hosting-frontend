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
                    <input type="text" class="form-control form-control-lg input-search" placeholder="Кем хотите работать?" v-model="searchQueryString" required/>
                    <span class="input-search-subtitle">Например: бухгалтер, продажи и т.п</span>
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control form-control-lg input-search-city" placeholder="Начните вводить название города" @input="searchCity">
                    <div class="list-group city-clue" v-if="city_clue_visible">
                        <span class="text-muted">Возможно вы ищите следующее:</span>
                        <a href="#" class="list-group-item list-group-item-action clue">Николаев</a>
                        <a href="#" class="list-group-item list-group-item-action clue">Николаевская область</a>
                        <a href="#" class="list-group-item list-group-item-action clue">Николаевка</a>
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

                changeCity: '',
                city_clue_visible: false
            }
        },
        watch: {
            searchCity: function(value) {
                this.searchCity = this.value;
                console.log(this.searchCity)
            }
        },
        async fetch() {
            await this.getCitiesList()
            this.stats = this.params
        },
        methods: {
            async getCitiesList() {
                const response = (await this.$axios.get('/dictionary/cities')).data;
                if(response.status) {
                    this.cities = response.data;
                }
            },

            async changeFilterParams() {
                let object = {...this.$route.query}
                object.searchQueryString = this.searchQueryString;
                object.searchCity = this.searchCity;
                this.$nuxt.$emit('search', object)
            }
        }
    }
</script>

<style scoped>

</style>
