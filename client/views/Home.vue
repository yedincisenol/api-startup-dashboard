<template>
  <div class="home">
    <div class="navigate-menu">
      <menu-component></menu-component>
    </div>
    <div class="content-container">
      <div class="alert alert-success">
        Welcome Api Startup Dashboard
      </div>

      You can switch other pages from top menu.

      <hr>
      <a target="_blank" href="https://github.com/yedincisenol/api-startup-dashboard">@github source</a> | 
      <a target="_blank" href="https://github.com/yedincisenol/api-startup-laravel">server code</a> |
      <a target="_blank" href="https://twitter.com/yedincisenol">@yedincisenol on Twitter</a>
    </div>
    </div>
</template>

<script>
export default {

  created: () => {
    if (!window.app.$session.get('access_token')) {
      window.app.$router.push({ name: 'login'})
    }
  }
}
</script>

<style>
h2 {
  font-size: 12pt;

}
</style>
