<template>
    <div>
        <h2 class="h1 mb-0">Финансы</h2>

        <div class="row mt-3 block">
            <div class="col-md-5">
                <div class="finances-block">
                    <div class="form-group">
                        <div class="js-fields-area">
                            <div class="input">
                                <label>
                                    <input type="text" v-model="amount"/>
                                    <span>Сумма пополнения</span>
                                </label>
                            </div>
                        </div>
                        <small class="text-muted">Сумма пополнения должна быть от <b>100</b> до <b>15.000</b> рублей!</small>
                    </div>

                    <div class="form-group payment-methods">
                        <div class="col-md-6 payment-method d-flex" :class="{'active': payment_method === 'stripe'}" @click="payment_method = 'stripe'">
                            <div class="payments-list payment-provider-logo">
                                <div class="pay-item">
                                    <div class="pay-item-inner"><span><img
                                            src="/assets/img/payments/mastercard.png" alt="MasterCard"
                                            style="max-height: 39px;"></span></div>
                                </div>
                                <div class="pay-item">
                                    <div class="pay-item-inner"><span><img
                                            src="/assets/img/payments/visa.png" alt="Visa"
                                            style="max-height: 22px;"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 payment-method" :class="{'active': payment_method === 'paypal'}" @click="payment_method = 'paypal'">
                            <img src="/assets/img/payments/paypal.png" width="73px"/>
                        </div>
                        <div class="col-md-6 payment-method" :class="{'active': payment_method === 'webmoney'}" @click="payment_method = 'webmoney'">
                            <img src="/assets/img/payments/webmoney.png" width="73px"/>
                        </div>
                        <div class="col-md-6 payment-method" :class="{'active': payment_method === 'bitcoin'}" @click="payment_method = 'bitcoin'">
                            <img src="/assets/img/payments/bitcoin.svg" width="155px"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-block btn-primary btn-lg" v-if="payment_method && amount > 99 && amount < 15001">Оплатить {{ amount }}.00
                            рублей
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-7">
                <div class="payment-description text-muted pl-3 pr-3">
                    <h5>Реквизиты для оплаты по счету</h5>
                    <div class="text-muted">Для активации оплаты по счёту, обратитесь в <NuxtLink to="/tickets/">поддержку</NuxtLink></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "finances",
        data() {
            return {
                amount: 100,
                payment_method: 'stripe'
            }
        }
    }
</script>

<style scoped>

</style>