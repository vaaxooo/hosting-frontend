<template>
    <div class="block justify-content-center text-center">
        <img src="/assets/illustrations/Credit Card Payment-pana.png" width="50%" height="50%" />
        <div class="payment-info">
            <h3>Платёж был проведён успешно</h3>
            <span>Идентификатор платежа <b>#{{ payment_id }}</b></span>
            <span class="text-muted"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success",
        layout: "account/default",
        data() {
            return {
                payment_id: this.$route.query.session_id || 'отсутствует!'
            }
        },
        async fetch() {
            await this.checkStatus();
        },
        methods: {
            async checkStatus() {
                if(this.$route.query.session_id) {
                    this.message = '';
                    this.status = false;
                    this.errors = {};
                    this.loading = true;
                    let response = (await this.$axios.get('/payments/success', {
                        params: {
                            session_id: this.$route.query.session_id
                        }
                    })).data;
                    this.loading = false;
                    if (!response.status) {
                        if (response.errors) {
                            this.errors = response.errors
                        }
                        return false;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
