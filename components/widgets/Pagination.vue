<template>
    <nav v-if="30 < totalVacancies || totalVacancies === 0 || pages <= 1">
        <ul class="pagination pagination-lg justify-content-center">
            <li class="page-item" v-if="+current_page > 1">
                <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item" v-for="index in +current_page - 1" :key="index">
                <a class="page-link ${+current_page === index ? 'active' : ''}">${index}</a>
            </li>

            <span v-if="pages > 6">
                <span style="margin-top: 15px; padding: 0px 10px; font-weight: 600; color: #0d6efd;">...</span>
                <li class="page-item">
                    <a class="page-link" :class="+current_page === pages ? 'active' : ''">{{ pages }}</a>
                </li>
            </span>


            <li class="page-item" v-if="+current_page !== pages">
                <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
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
                current_page: this.$route.query.page || 1,
                pages: +Math.ceil(this.totalVacancies / 30)
            }
        },
        async fetch() {
            this.totalVacancies = this.params.total;
        }
    }
</script>

<style scoped>

</style>
