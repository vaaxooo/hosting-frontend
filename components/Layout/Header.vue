<template>
    <div class="content-navbar mb-5">
        <nav class="content-header">
            <div class="user-profile" @click="user_modal = true">
                <div class="user-info">
                    <span class="user-name">{{ user.name }}</span>
                    <span class="user-balance">{{ user.balance }} ₽</span>
                </div>
                <div class="user-avatar">
                    <img src="/assets/img/hosting.png" width="42px" />
                </div>
            </div>
            <div class="user-logout" @click="logout">
                <i class="fas fa-fw fa-sign-out-alt"></i>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                user: {
                    name: this.$auth.user.email,
                    balance: this.$auth.user.balance
                }
            }
        },

        methods: {
            async logout() {
                await this.$auth.logout();
                this.$router.go('/auth/login');
            }
        }
    }
</script>