<template>
    <div class="navbar navbar-expand-lg menu-white sticky-top">

        <NuxtLink class="navbar-brand" to="/">
            <b>Project</b>
        </NuxtLink>
        <div class="d-flex align-items-center">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse"
                    aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse flex-column" id="navbar-collapse">
            <ul class="navbar-nav d-lg-block">


                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/account/my/finances/">
                        <i class="fas fa-fw fa-credit-card"></i>
                        Финансы
                    </NuxtLink>
                </li>

                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/account/my/settings/">
                        <i class="fas fa-fw fa-cogs"></i>
                        Настройки
                    </NuxtLink>
                </li>

            </ul>
            <hr>
            <div class="d-none d-lg-block w-100">
                <ul class="nav nav-small flex-column mt-2">
                    <li class="nav-item" v-if="!this.$auth.user.verified">
                        <NuxtLink to="/account/my/identification" class="nav-link">Идентификация</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Партнерам</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Документация API</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu"
    }
</script>
