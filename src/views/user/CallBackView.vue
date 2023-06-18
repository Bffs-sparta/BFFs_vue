<template>
    <div></div>
</template>

<script>
export default {
    created(){
        const access_token = this.$route.query.access_token;
        const refresh_token = this.$route.query.refresh_token;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
        localStorage.setItem('payload', jsonPayload)
        this.$router.push('/');
    }
}
</script>

<style>

</style>