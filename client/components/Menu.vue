<template>
  <div class="menu">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Api Startup</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/user">Users</router-link>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/me">Profile</router-link>
                </li>
            </ul>

            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-danger my-2 my-sm-0" type="button" v-on:click="logout">Logout</button>
            </form>
        </div>
        </nav>
  </div>
</template>
<script>
export default {
  methods: {
      logout: function() {
          this.$session.remove('access_token');
          this.$router.push({name: 'login'});
      },
      goUsers: function() {
          this.$router.push({name: 'user'});
      }
  }
}
</script>
<style>

.menu {
    text-align: left;
    width: 100%;
    display: block;
}

.menu ul {
    list-style: none;
}

</style>

