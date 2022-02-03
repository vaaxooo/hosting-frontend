<template>
    <div class="block-filter content bg-default">
        <div class="form-group filter-type">
            <label class="filter-title">Рубрики</label>
            <input type="search" list="rubricsList" class="form-select form-select-lg input-rubrics" placeholder="Выберите рубрику" v-model="rubric" @change="changeFilterParams('rubric', rubric)">
            <datalist id="rubricsList">
                <option v-for="{_source: rubric} in rubrics" :key="rubric.id" :value="rubric.ru">{{ rubric.ru }}</option>
            </datalist>
        </div>

        <form name="shedules_list" class="form-group filter-type">
            <label class="filter-title">Вид занятости:</label>
            <div class="form-check" v-for="employment in employment_type" :key="employment.id">
                <input class="form-check-input" type="radio" v-model="scheduleId" :value="employment.id"  @click="changeFilterParams('scheduleId', employment.id)">
                <label class="form-check-label">
                    {{ employment.value }}
                </label>
            </div>
        </form>

        <div class="form-group">
            <label class="filter-title">Хочу зарплату</label>
            <div class="row">
                <div class="col-md-8">
                    <div class="input-group">
                        <span class="input-group-text salary-subtitle">от</span>
                        <input type="number" class="form-control form-control-lg input-salary" v-model="salaryFrom">
                        <span class="input-group-text salary-subtitle">грн.</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <button type="submit" class="btn btn-blue btn-lg" @click="changeFilterParams('salaryFrom', salaryFrom)">OK</button>
                    </div>
                </div>
            </div>


            <div class="banners">
                <div class="banner-empty">
                    <div class="banner-title">
                        300x400
                        <span class="banner-subtitle">Здесь может быть ваш баннер!</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Filters",
        props: ['getVacanciesList'],
        data() {
            return {
                rubrics: [],
                rubric: this.$route.query.rubric || '',
                salaryFrom: this.$route.query.salaryFrom || '',
                scheduleId: this.$route.query.scheduleId || '',

                employment_type: [
                    {
                        id: 1,
                        value: 'Полная занятость'
                    },
                    {
                        id: 2,
                        value: 'Стажировка / практика'
                    },
                    {
                        id: 3,
                        value: 'Неполная занятость'
                    },
                    {
                        id: 4,
                        value: 'Удаленная работа'
                    }

                ]
            }
        },
        async fetch() {
            await this.getRubricsList()
        },
        methods: {
            async getRubricsList() {
                const response = (await this.$axios.get('/dictionary/rubrics')).data;
                if(response.status) {
                    this.rubrics = response.data;
                }
            },

            async changeFilterParams(type, param) {
                let object = {...this.$route.query}
                object[type] = param;
                this.$nuxt.$emit('filter', object)
            }
        }
    }
</script>

<style scoped>

</style>
