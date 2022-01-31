<template>
    <div class=" layout layout-nav-side">
        <LayoutMenu/>

        <div class="main-container">
            <LayoutHeader/>
            <div class="container content">
                <Nuxt/>
            </div>
        </div>

    </div>
</template>

<script>
    require('~/static/assets/css/css.css');
    require('~/static/assets/css/icon.css');
    require('~/static/assets/css/theme.css');

    export default {
        name: "default"
    }
</script>
