<template>
  <section id="app">
    <header>
      <h1 class="hidden">Welcome to the Chat App</h1>
      <h2>Chat App with VueCLI, Socket.io and Express</h2>
    </header>

    <h4>Below this is dynamic content - the router-view</h4>
    <!-- the router view is the container that accepts components to render per route -->
    <router-view></router-view>
    <h4>Above this is dynamic content - the router-view</h4>
  </section>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  text-align: center;
  background-color: blue;
  padding: 1em 0.8em;
  color: white;
}

header {
  .hidden { display: none; }
  h2 { font-size: 2.5em; margin-bottom: 0.8em; }
}
</style>
