<template>
    <main>
        <h1 class="welcome-message">Welcome {{ ChatUserName }}</h1>

        <section id="chat">
            <!-- the left-hand side of our UI where we see current users -->
            <section id="chat-users-ui">
                <h2>Current Users:</h2>

                <!-- list of users -->
                <ul id="current-users">
                    <!-- this will take a sub-component that will render one for each user -->
                </ul>
            </section>
            <!-- end left hand -->

            <!-- main chat UI -->
            <section id="chat-messages-ui">
                <!-- custom chat message component here -->
                <ChatMessage
                    v-for="msg in messages"
                    :key="msg.id"
                    :message="msg.message"
                    :username="msg.user"
                />

                <section id="text-wrapper">
                    <textarea id="message" v-model="message" placeholder="What's on your mind?"></textarea>

                    <button 
                    id="sendMessage"
                    @click="sendMessage">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </section>
            </section>
        </section>
    </main>
</template>

<script>
import io from "socket.io-client";
import vars from "@/env.js";
import ChatMessage from "@/components/ChatMessage.vue";

export default { 
    name:"TheChatComponent",

    props: {
        ChatUserName: String
    },

    mounted() {
        let vm = this;

        this.socket.on("CONNECTED", (id) => {
            vm.socketID = id;
        })

        this.socket.on('MESSAGE', (message) => {
            // [...] is a the spread operator
            // short hand way to add something to an array, or put 2 arrays together, etc
            vm.messages = [...vm.messages, message];
            console.log(message);
        })
    },

    data() {
        return {
            socketID: '',
            message: '',
            messages: [],

            // set up the socket connection on the front end
            // this connects to the chat service running on port 3000
            socket: io(vars.basePath, {
                withCredentials: false,
                extraHeaders: {
                    'Access-Control-Allow-Origin' : '*'
                }
            })
        }
    },

    methods: {
        sendMessage() {
            this.socket.emit('SEND_MESSAGE', { user: this.ChatUserName || "Anonymous", message: this.message });

            // empty out the text area and get ready to input a new message
            this.message = '';
        }
    },

    components: {
        ChatMessage
    }
}
</script>

<style lang="scss">
    @import "@/assets/sass/_chat.scss";
</style>