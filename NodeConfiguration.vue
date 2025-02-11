<template>
  <div class="node-configuration">
    <h2>Configuração do Nó para o Bot {{ botId }}</h2>
    <form @submit.prevent="saveNodeConfig">
      <label for="nodeName">Nome do Nó:</label>
      <input type="text" v-model="nodeName" required />

      <label for="nodeAction">Ação do Nó:</label>
      <select v-model="nodeAction" required>
        <option value="buy">Comprar</option>
        <option value="sell">Vender</option>
      </select>

      <button type="submit">Salvar Configuração</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NodeConfiguration',
  props: ['botId'],
  data() {
    return {
      nodeName: '',
      nodeAction: 'buy'
    };
  },
  methods: {
    async saveNodeConfig() {
      if (!this.nodeName) {
        alert('Nome do nó é obrigatório');
        return;
      }
      try {
        const response = await fetch(`/api/bots/${this.botId}/node`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
          },
          body: JSON.stringify({ 
            name: this.nodeName,
            action: this.nodeAction
          })
        });
        if (response.ok) {
          console.log(`Configuração do nó "${this.nodeName}" salva para o bot ${this.botId}`);
          alert('Configuração salva com sucesso!');
          this.$router.push(`/node-status/${this.botId}`);
        } else {
          const errorData = await response.json();
          alert(`Erro ao salvar configuração: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Erro ao salvar configuração do nó:', error);
        alert('Erro ao salvar configuração');
      }
    }
  }
};
</script>

<style scoped>
.node-configuration {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #222;
  border-radius: 5px;
}
.node-configuration form label {
  display: block;
  margin-top: 10px;
}
.node-configuration form input,
.node-configuration form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
.node-configuration button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #00ffff;
  border: none;
  color: #000;
  cursor: pointer;
}
</style>
