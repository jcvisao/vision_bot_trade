<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Usuário:</label>
      <input type="text" v-model="username" required />
      
      <label for="password">Senha:</label>
      <input type="password" v-model="password" required />
      
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token no localStorage
        this.$router.push('/'); // Redireciona para o Dashboard após login
      } else {
        alert('Credenciais inválidas');
      }
    },
  },
};
</script>
