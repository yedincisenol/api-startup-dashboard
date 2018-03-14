<template>
    <div>
        <div class="navigate-menu">
            <menu-component></menu-component>
        </div>
        <div class="content-container">
        <form v-if="!notFound">
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="user.email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="email" class="form-control" v-model="user.name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label>Role</label>
                <select v-model="user.role" class="form-control" >
                <option v-for="(role) in roles" :selected="role == user.role">{{ role }}</option>
                </select>
            </div>
            <button v-on:click="update" type="button" class="btn btn-primary">Update</button>
            </form>
            <div v-if="notFound" class="alert alert-danger">
                User not found
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            roles: ['admin', 'superadmin', 'user'],
            user: {},
            notFound: false
        }
    },
  created(){
    if (!app.$session.get('access_token')) {
      app.$router.push({ name: 'login'})
    }

    this.getUser();
  },

  methods: {
    getUser() {
      app.$http.get(
        Helper.getApiEndpoint('user/' + this.$route.query.user_id), {
          headers: Helper.getApiHeaders()
        }
      ).then((r) => {
        this.user = r.body.data;
        this.notFound = false;
      }, (e) => {
          this.notFound = true;
      });
    },
    update() {
        let headers = Helper.getApiHeaders();
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        app.$http.put(
            Helper.getApiEndpoint('user/' + this.$route.query.user_id), 
            Helper.jsonToUrlEncoded(this.user), {
                headers: headers,
            }
        ).then((s) => {
            app.$toasted.show('User updated');
        })
    }
  }
}
</script>

