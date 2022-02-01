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

                <section id="text-wrapper">
                    <textarea id="message" placeholder="What's on your mind?"></textarea>

                    <button id="sendMessage">Send Message</button>
                </section>
            </section>
        </section>
    </main>
</template>

<script>
export default { 
    name:"TheChatComponent",

    props: {
        ChatUserName: String
    }
}
</script>

<style lang="scss">
    @import "../../src/assets/sass/vars";
    @import "../../src/assets/sass/chat";
</style>