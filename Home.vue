<template>
  <div class="home">
    <header class="home-header">
      <img src="@/assets/logo.png" alt="Logo" class="home-logo" />
      <h1>Bem-vindo ao Vision Trade Bot</h1>
    </header>

    <section class="intro">
      <p>
        Utilize nossa plataforma para gerenciar bots de negociação de criptomoedas. Tenha controle total sobre suas
        operações e maximize seus lucros com automações inteligentes.
      </p>
      <router-link to="/dashboard">
        <button class="btn-primary">Ir para o Painel</button>
      </router-link>
    </section>

    <section class="statistics">
      <h2>Estatísticas de Mercado</h2>
      <div class="stat-card">
        <h3>Bitcoin (BTC)</h3>
        <p>Preço Atual: {{ bitcoinPrice }} USD</p>
        <p>Variação de 24h: {{ bitcoinChange }}%</p>
      </div>
      <div class="stat-card">
        <h3>Ethereum (ETH)</h3>
        <p>Preço Atual: {{ ethereumPrice }} USD</p>
        <p>Variação de 24h: {{ ethereumChange }}%</p>
      </div>
    </section>

    <section class="features">
      <h2>Funcionalidades</h2>
      <div class="feature-card">
        <h3>Criação de Bots</h3>
        <p>Configure e personalize seus bots para realizar negociações automáticas com estratégias avançadas.</p>
        <router-link to="/create-bot">
          <button class="btn-secondary">Criar Novo Bot</button>
        </router-link>
      </div>
      <div class="feature-card">
        <h3>Relatórios</h3>
        <p>Acompanhe o desempenho dos seus bots e obtenha relatórios detalhados de todas as transações realizadas.</p>
        <router-link to="/bot-reports">
          <button class="btn-secondary">Ver Relatórios</button>
        </router-link>
      </div>
    </section>

    <!-- Botão para abrir o modal -->
    <v-btn @click="showModal = true">Abrir Modal</v-btn>
    <!-- Modal -->
    <v-dialog v-model="showModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalhes do Bot</span>
        </v-card-title>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="showModal = false">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="createBot">Criar Bot</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      bitcoinPrice: 45250.00, // Preço fictício para Bitcoin
      bitcoinChange: 2.45, // Variação fictícia em 24h
      ethereumPrice: 3200.00, // Preço fictício para Ethereum
      ethereumChange: 1.78, // Variação fictícia em 24h
      showModal: false
    };
  },
  mounted() {
    // Aqui você pode adicionar lógica para buscar dados reais de uma API ou banco de dados
    // Exemplo: Buscando dados de preços de criptomoedas via API
    this.fetchCryptoPrices();
  },
  methods: {
    async fetchCryptoPrices() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        this.bitcoinPrice = data.bitcoin.usd;
        this.ethereumPrice = data.ethereum.usd;
      } catch (error) {
        console.error('Erro ao buscar preços das criptomoedas:', error);
      }
    },
    createBot() {
      console.log("Bot criado!");
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
}

.home-logo {
  max-width: 150px;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  font-size: 36px;
  margin-bottom: 10px;
}

.intro {
  text-align: center;
  margin-bottom: 50px;
}

.intro p {
  font-size: 18px;
  color: #666;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #45a049;
}

.statistics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}

.stat-card {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
  width: 48%;
}

.stat-card h3 {
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 18px;
  color: #333;
}

.features {
  display: flex;
  justify-content: space-between;
}

.feature-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: 48%;
}

.feature-card h3 {
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 16px;
  color: #666;
}

.btn-secondary {
  background-color: #008CBA;
  color: white;
  padding: 15px 30px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #005f73;
}
</style>
