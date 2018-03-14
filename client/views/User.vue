<template>
  <div class="">
    <div class="navigate-menu">
      <menu-component></menu-component>
    </div>
    <div class="content-container">
    <h2>
        User List
      </h2>
    <div class="user-list">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(user, index) in users">
            <tr>
              <th width="5" scope="row">{{user.id}}</th>
              <td width="250">{{user.name}}</td>
              <td width="250">{{user.email}}</td>
              <td width="250">{{user.role}}</td>
              <td>
                <button v-on:click="deleteUser(user.id, index)" :to="'user/delete?user_id=' + user.id" class="btn btn-danger btn-sm">Delete</button>
                <router-link :to="'user/detail?user_id=' + user.id" class="btn btn-info btn-sm">Edit</router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="pagination.previous" class="page-item"><router-link :to="pagination.previous" class="page-link" >Previous</router-link></li>
          <li v-for="(page, index) in pagination.pages" class="page-item" v-bind:class="{ active : ((pagination.current -1) == index)}">
            <router-link class="page-link" :to="page" > {{ index + 1 }} </router-link>
          </li>
          <li v-if="pagination.next" class="page-item"><router-link :to="pagination.next" class="page-link">Next</router-link></li>
        </ul>
      </nav>
    </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      users: null,
      pagination : {
        next: null,
        previous: null,
        pages: [],
        current: 1
      }
    };
  },

  created(){
    if (!app.$session.get('access_token')) {
      app.$router.push({ name: 'login'})
    }
  
    this.getUsers();
  },
  watch: {
      '$route.query.page'() {
          this.getUsers();
      }
  },

  methods:{
    
    getUsers() {
      app.$http.get(
        Helper.getApiEndpoint('user'), {
          headers: Helper.getApiHeaders(),
          params: {
            page: this.$route.query.page
          }
        }
      ).then((r) => {
        this.users = r.body.data;
        let pagination = r.body.meta.pagination;
        this.pagination.current = pagination.current_page;
        if (pagination.links.next) {
          this.pagination.next = '?page=' + (pagination.current_page + 1);
        } else {
          this.pagination.next = false;
        }
        
        if (pagination.links.previous) {
          this.pagination.previous = '?page=' + (pagination.current_page - 1);
        } else {
          this.pagination.previous = false;
        }

        this.pagination.pages = [];

        for(let i = 0; i < pagination.total_pages; i++) {
          this.pagination.pages.push('?page=' + (i + 1));
        }
      });
    },
    deleteUser(userID, index) {
      this.$dialog.confirm('Please confirm to continue')
        .then(() => {
            app.$http.delete(
              Helper.getApiEndpoint('user/' + userID), {
                headers: Helper.getApiHeaders()
              }
            ).then(r => {
              app.$toasted.show('User deleted');
              this.users.splice(index, 1);
            }, e => {
              app.$toasted.show(e.body.message);
            });
        })
        .catch(function () {
          app.$toasted.show('Canceled');
        });
    }
  }
}
</script>

<style>
h2 {
  font-size: 12pt;

}
</style>
