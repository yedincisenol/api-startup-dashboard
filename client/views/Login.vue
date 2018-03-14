<template>
  <div class="text-center login">
      <form class="form-signin">
        <img class="mb-4" src="https://yeni.co/uploads/V0RNfivD.png" alt=""  height="40">
        <h2 class="h3 mb-3 font-weight-normal">Laravel Api Startup</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="login">Sign in</button>
    </form>
  </div>
</template>

<script>

export default {
  data : () => {
    return {
      email: Config.DEFAULT_USERNAME,
      password: Config.DEFAULT_PASSWORD
    }
  },
  created: () => {

  },
  methods: {
    validate: function() {
      if (!this.email) {
        this.$toasted.error('Plase fill email');
        return false;
      }

      if (!this.password) {
        this.$toasted.global.error('Please fill password');
        return false;
      }

      return true;
    },
    login: function(e) {
      e.preventDefault();
      let valid = this.validate();
      if (valid) {
        this.$http.post(
          Helper.getApiEndpoint('oauth/token'), {
            grant_type: "password",
            username: this.email,
            password: this.password,
            client_id: Config.API_CLIENT_ID,
            client_secret: Config.API_CLIENT_SECRET,
            scope: "*"
          }, {
            "Content-Type" : "application/x-www-form-urlencoded"
          }).then(r => {
            let headers =  Helper.getApiHeaders();
            headers["Authorization"] = "Bearer " + r.body.access_token;
            this.$http.get(
              Helper.getApiEndpoint('self/me'), {
                headers: headers
              }
            ).then(s => {
              if (s.body.data.role != 'admin') {
                this.$toasted.show('You havent right to access admin');
              } else {
                this.$toasted.show('Login success');
                this.$session.set('access_token', r.body.access_token);
                this.$router.push({ name: 'home'})
              }
            }, e => {
              console.log(e);
            });
          }, e => {
            this.$toasted.show(e.body.message);
          })
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: 10%;
  font-size: 10pt;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

