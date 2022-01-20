<template>
    <div class="container layout layout-nav-side">
        <LayoutMenu/>

        <div class="main-container">
            <LayoutHeader/>
            <div class="content">
                <Nuxt/>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "default"
    }
</script>