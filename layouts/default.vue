<template>
    <div>
        <div class="header border-bottom">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="logo" href="/">WorkBoard</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/vacancies/search/1">Найти вакансии</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Разместить резюме</a>
                            </li>
                        </ul>
                        <div class="d-flex">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="btn btn-blue btn-lg" aria-current="page" href="/cabinet/auth/login">
                                        Войти
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="container">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
    import '~/static/assets/landing/css/template.css'
    import '~/static/assets/landing/css/work.css'

    export default {
        name: "default"
    }
</script>

<style scoped>

</style>
