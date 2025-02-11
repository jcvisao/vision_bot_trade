<template>
  <div class="create-bot">
    <h2>Criar Bot</h2>
    <form @submit.prevent="submitForm">
      <label for="bot-name">Nome do Bot:</label>
      <input id="bot-name" type="text" v-model="botName" required />

      <label for="bot-exchange">Corretora:</label>
      <select id="bot-exchange" v-model="botExchange" required>
        <!-- Aqui você pode popular dinamicamente; exemplo fixo: -->
        <option value="binance">Binance</option>
        <option value="kraken">Kraken</option>
        <option value="kucoin">KuCoin</option>
      </select>

      <div class="broker-section">
        <h3>Cadastrar Corretora</h3>
        <input v-model="brokerName" placeholder="Nome da Corretora" required />
        <input v-model="apiKey" placeholder="API Key" required />
        <button type="button" @click="registerBroker">Cadastrar Corretora</button>
      </div>

      <button type="submit">Criar Bot</button>
    </form>

    <div class="extra-buttons">
      <!-- Botões adicionais para ações alternativas -->
      <button @click="createDefiBot">Criar Bot DeFi</button>
    </div>

    <!-- Exemplo de exibição do logotipo -->
    <img src="/LOGO_MG_BRAZIL.png" alt="Logo da Plataforma" />

    <!-- Exemplo de modal usando Vuetify (se estiver configurado) -->
    <!-- Se não usar Vuetify, remova este trecho -->
    <v-btn @click="showModal = true">Abrir Modal</v-btn>
    <v-dialog v-model="showModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Criar Bot</span>
        </v-card-title>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="showModal = false">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="submitForm">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateBot',
  data() {
    return {
      botName: '',
      botExchange: 'binance',
      brokerName: '',
      apiKey: '',
      showModal: false
    };
  },
  methods: {
    async submitForm() {
      if (!this.botName) {
        alert('Nome do bot é obrigatório');
        return;
      }
      try {
        // Envia os dados para o endpoint protegido de criação de bot
        const response = await fetch('/api/bots', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
          },
          body: JSON.stringify({ name: this.botName, exchange: this.botExchange })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Bot criado com sucesso!');
          this.$router.push('/bot-reports');
        } else {
          alert(`Erro ao criar o bot: ${data.error}`);
        }
      } catch (error) {
        console.error(error);
        alert("Erro na comunicação com o servidor.");
      }
    },
    async registerBroker() {
      try {
        const response = await fetch('/api/register-broker', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.brokerName, apiKey: this.apiKey })
        });
        const data = await response.json();
        if (data.success) {
          alert('Corretora cadastrada com sucesso!');
          // Se necessário, atualize as opções de corretora aqui.
        } else {
          alert('Erro ao cadastrar corretora: ' + data.error);
        }
      } catch (error) {
        console.error(error);
        alert('Erro na comunicação com o servidor.');
      }
    },
    async createDefiBot() {
      try {
        const response = await fetch('/createDefiBot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.botName, defiOptions: {} })
        });
        const data = await response.json();
        if (data.success) {
          alert('Bot DeFi criado com sucesso!');
        } else {
          alert('Erro ao criar Bot DeFi: ' + data.error);
        }
      } catch (error) {
        console.error(error);
        alert('Erro na comunicação com o servidor.');
      }
    }
  }
};
</script>

<style scoped>
.create-bot {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #222;
  border-radius: 5px;
}
.create-bot form label {
  display: block;
  margin-top: 10px;
}
.create-bot form input,
.create-bot form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
.create-bot button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #00ffff;
  border: none;
  color: #000;
  cursor: pointer;
}
.broker-section {
  margin: 20px 0;
  padding: 10px;
  background: #333;
  border-radius: 5px;
}
.extra-buttons {
  margin-top: 20px;
}
</style>
