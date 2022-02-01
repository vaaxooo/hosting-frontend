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
    export default {
        name: "default"
    }
</script>
