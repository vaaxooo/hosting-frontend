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
    import '~/static/assets/css/css.css';
    import '~/static/assets/css/icon.css';
    import '~/static/assets/css/theme.css';

    export default {
        name: "default"
    }
</script>
