<template>
    <div class="row block-search">
        <div class="row py-5">
            <div class="block-search-title">
                Помогаем найти работу, с которой жизнь будет в радость

                <span class="block-search-subtitle" v-if="params.type === 'search' && params.total === 0">По запросу "<b>{{params.query}}</b>" вакансий не найдено!</span>
                <span class="block-search-subtitle" v-if="params.type === 'search'">По запросу "<b>{{params.query}}</b>" найдено <b>{{params.total}}</b> актуальних вакансий.</span>
                <span class="block-search-subtitle" v-else>Сейчас у нас <b>{{params.total}}</b> актуальних вакансий.</span>
            </div>
            <div class="input-group">
                <div class="col-md-7">
                    <input type="text" class="form-control form-control-lg input-search" placeholder="Кем хотите работать?" required/>
                </div>
                <div class="col-md-4">
                    <input type="search" list="blow" class="form-select form-select-lg input-search-city custom-select" placeholder="Начните вводить город" />
                    <datalist id="blow">
                        <option v-for="{_source: city} of cities" :key="city.id">{{ city.ru }}</option>
                    </datalist>
                </div>
                <div class="col-md-1">
                    <button type="submit" class="btn btn-blue btn-block btn-lg">Найти</button>
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
                stats: []
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
            }
        }
    }
</script>

<style scoped>

</style>
