<template>
    <div class="banned">
            <h3>Your account has been banned</h3>
            <p>
                Reason: {{ user.banReason }} <br>
                Expires: {{ user.banHistory[0].expires | moment("MM/DD/YYYY hh:mm a")}}
            </p>
            <!-- for more information please visit <router-link :to="{ name: 'Sanction' }">Sanction page</router-link></p> -->
    </div>
</template>

<script>
export default {
    name: 'BannedComp',
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
        height: 6rem;
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