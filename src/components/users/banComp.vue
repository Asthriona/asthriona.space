<template>
    <div class="banned">
            <h3>Your account has been banned</h3>
            <p>Ban reason: {{ user.banReason }} </p>
            <!-- for more information please visit <router-link :to="{ name: 'Sanction' }">Sanction page</router-link></p> -->
    </div>
</template>

<script>
export default {
    name: 'Banned',
    props: ["user"]
}
</script>

<style scoped>
    .banned { 
        background-color: #f00; 
        position: relative;
        top: 4rem;
        left: 0;
        width: 100%;
        height: 4rem;
        text-align: center;
        color: #fff;
        line-height: 200%;
        }
        .banned h3 {
            font-size: 2rem;
        }
        .banned p {
            font-size: 1rem;
        }
</style>