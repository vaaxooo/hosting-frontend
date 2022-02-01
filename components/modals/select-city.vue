<template>
    <div class="modal fade show w-70" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style="display: block;">
        <div class="overlay"></div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <a class="link" v-for="{_source: city} in citiesList" :key="city.id">{{ city.ru }}</a>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['cities'],
        name: "select-city",
        data() {
            return {
                citiesList: []
            }
        },
        fetch() {
            this.citiesList = this.cities
        }
    }
</script>

<style scoped>

</style>
