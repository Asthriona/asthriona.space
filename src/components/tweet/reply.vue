<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mt-4">
                    <v-card-title>
                        <v-avatar><v-img :src="reply.author.avatar"></v-img></v-avatar> <span class="ml-2">{{ reply.author.displayName }}</span> <v-icon>{{ reply.author.selectedBadge }}</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <p v-html="reply.content"></p>
                    </v-card-text>
                    <v-card-actions>
                        <small>
                            <v-icon>mdi-calendar-month-outline</v-icon> 
                        </small>
                        <small style="color:'#657786';text-decoration: underline;">
                            <router-link :to="`/tweet/${reply._id}`">{{ reply.createdAt }}</router-link>
                        </small>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "replyComp",
    props: ["reply", "user"],
}
</script>