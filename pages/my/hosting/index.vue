<template>
    <div>
        <div class="d-flex">
            <h2 class="h1 mb-0">Заказы</h2>
            <div class="actions">
                <button type="button" class="btn btn-primary">Заказать ещё</button>
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

        <div class="table-orders block">
            <div class="row table-actions">
                <div class="col-md-12 actions-left input-group ">
                    <span class="input-group-text">
                        <img src="https://cdn2.iconfinder.com/data/icons/lightly-icons/30/search-240.png" width="24px" />
                    </span>
                    <input type="text" class="form-control input-search" placeholder="Поиск" />
                </div>
            </div>
            <table class="border--round table--alternate-row">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Локация</th>
                    <th>Осталось</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <span class="order-name"><b>Economy</b> — v94915.hostru04</span>
                        <span class="order-subinfo">80-94915  Economy</span>
                    </td>
                    <td>
                        <img src="https://fornex.com/static/images/flags/ru.fb2ce0cf34c4.svg" width="32px"/>
                    </td>
                    <td>36 дней</td>
                    <td>
                        <span class="badge badge-active">активен</span>
                    </td>
                    <td>
                        <NuxtLink to="#">
                            <i class="fas fa-fw fa-ellipsis-v"></i>
                        </NuxtLink>
                    </td>
                </tr>
                </tbody>
            </table>
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