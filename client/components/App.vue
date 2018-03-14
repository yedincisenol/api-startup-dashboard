<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  display: block;
}
.page {
  text-align: center;
  /* nesting for the need to test postcss */
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}

.content-container {
  padding: 20px;
}
</style>
