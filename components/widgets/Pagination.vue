<template>
    <nav v-if="+totalVacancies !== 0 && +current_page !== +pages">
        <ul class="pagination pagination-lg justify-content-center">
            <li class="page-item" v-if="+current_page > 1">
                <a class="page-link" aria-label="Previous" @click="redirect(+current_page - 1)">
                    <span aria-hidden="true">&laquo; Предыдущая</span>
                </a>
            </li>


            <li class="page-item" v-if="+current_page !== +pages">
                <a class="page-link" aria-label="Next" @click="redirect(+current_page + 1)">
                    <span aria-hidden="true">Следующая &raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['params'],
        data() {
            return {
                totalVacancies: 0,
                current_page: this.$route.query?.page || 1,
                pages: 1,
                data: []
            }
        },
        async fetch() {
            this.totalVacancies = this.params.total;
            this.pages = +Math.ceil(+this.totalVacancies / 30);
        },

        methods: {
            redirect(page) {
                console.log(page, this.current_page)
                let object = {...this.$route.query}
                object.page = page;
                this.$nuxt.$emit('pagination', object)
            }
        }
    }
</script>

<style scoped>

</style>
