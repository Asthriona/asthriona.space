<template>
    <div class="AdminZone">
        <div class="AdminZone__header">
            <h1>Admin zone</h1>
        </div>
        <div class="AdminZone__content">
            <div class="AdminZone__content__menu">
                <v-btn text><router-link to="/admin/users">Users</router-link></v-btn>
                <v-btn text><router-link to="/admin/blog">Blogs</router-link></v-btn>
                <v-btn text><router-link to="/admin/comments">Comments</router-link></v-btn>
                <v-btn text><router-link to="/admin/sanction">Sanction</router-link></v-btn>
                <v-btn text><router-link to="/admin/data">Website Data</router-link></v-btn>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>