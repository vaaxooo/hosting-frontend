<template>
    <div class="block justify-content-center text-center">
        <img src="/assets/illustrations/Credit Card Payment-pana.png" width="50%" height="50%" />
        <div class="payment-info">
            <h3>Платёж был отменён</h3>
            <span>Идентификатор платежа <b>#{{ payment_id }}</b></span>
            <span class="text-muted"></span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "fail",
        data() {
            return {
                payment_id: this.$route.query.session_id || 'отсутствует!'
            }
        }
    }
</script>

<style scoped>

</style>
