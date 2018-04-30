<template>
  <div>
    <div class="navigate-menu">
      <menu-component></menu-component>
    </div>
      <div class="content-container">
        <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Update Password</span>
            </h4>
                <form v-if="me" class="card p-2 update-password" v-on:submit.prevent="updatePassword"  >
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="current_password">Current Password</label>
                            <div class="input-group">
                                <input type="password" name="current_password" class="form-control" id="current_password" 
                                v-model="current_password" placeholder="Current Password" v-validate="'required'" />
                                <div v-if="error.current_password" class="error">{{ error.current_password.join() }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="password">New Password</label>
                            <div class="input-group">
                                <input type="password" name="password" class="form-control" v-model="password" placeholder="New Password" v-validate="'required|confirmed:password_repeat'"/>
                                <div v-if="error.password" class="error">{{ error.password.join() }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <button class="btn btn-success">Update Password</button>
                    </div>
                </form>
            </div>
            <div class="col-md-8 order-md-1">
                <h4 class="mb-3">My Profile</h4>
                <form class="profile-form" v-on:submit.prevent="updateProfile" data-vv-scope="profile">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Name" v-model="me.name" v-validate="'required'">
                            <div v-if="error.name" class="error">{{ error.name.join() }}</div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email">Email <span class="text-muted"></span></label>
                        <input type="email" name="email" class="form-control" id="email" readonly placeholder="you@example.com" v-model="me.email">
                    </div>
                    <hr class="mb-4">
                    <button class="btn btn-primary" type="submit" v-if="me">Update Profile</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        me: {},
        password: null,
        password_repeat: null,
        current_password: null,
        error: {}
    }
  },
  created(){
      this.getProfile();
  },
  methods: {
    getProfile() {
      app.$http.get(
        Helper.getApiEndpoint('self/me')
      ).then((r) => {
        this.me = r.body.data;
      }).then((r) => {
          this.$toasted.show(r.message);
      });
    },
    updateProfile() {
        app.$http.put(Helper.getApiEndpoint('self/me'), {
            name: this.me.name,
            email: this.me.email
        }
        ).then(s => {
            this.$toasted.show("Profile updated", {type: 'success'});
        }, e => {
            this.$toasted.show(e.body.message);
        });
    },
    updatePassword() {
        app.$http.put(Helper.getApiEndpoint('self/password'), {
            password: this.password,
            current_password: this.current_password
        }).then(s => {
            this.$toasted.show("Password updated", {type: 'success'});
        }, e => {
            this.error = e.body.error ? e.body.error : {};
            this.$toasted.show(e.body.message, {'type': 'error'});
        });
    }
  }
}
</script>
