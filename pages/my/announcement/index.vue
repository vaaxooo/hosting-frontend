<template>
    <div>
        <div class="d-flex">
            <h2 class="h1 mb-0">Объявления</h2>
            <div class="actions">
                <button type="button" class="btn btn-primary">Добавить объявление</button>
            </div>
        </div>
        <div class="identification d-flex" v-if="!this.$auth.user.verified">

            <img src="/assets/img/identification.png" width="54px" class="identification-image">
            <div class="identification-desc">
                <h5 class="identification-title">
                    Идентификация
                </h5>
                <span class="identification-description">Для использования услуг, вам нужно <NuxtLink to="/my/identification">подтвердить</NuxtLink> персональные данные.</span>
            </div>
        </div>




    </div>
</template>

<script>
    export default {
        name: "index",
    }
</script>

<style scoped>

</style>
