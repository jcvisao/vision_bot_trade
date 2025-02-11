<template>
  <div>
    <h2>Relatórios dos Bots</h2>
    <button @click="generateReports">Gerar Relatórios</button>
    <table>
      <thead>
        <tr>
          <th>Nome do Bot</th>
          <th>Corretora</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bot in bots" :key="bot.id">
          <td>{{ bot.name }}</td>
          <td>{{ bot.exchange }}</td>
          <td>{{ bot.status }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="reports.length > 0">
      <div v-for="(report, index) in reports" :key="index">
        <p>{{ report.title }}</p>
        <p>{{ report.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bots: [],
      reports: []  // nova propriedade para os relatórios
    };
  },
  async created() {
    const response = await fetch('/api/bots');
    const data = await response.json();
    this.bots = data.bots;
  },
  mounted() {
    this.fetchReports(); // busca os relatórios ao montar o componente
  },
  methods: {
    generateReports() {
      // Simulação de obtenção dos dados dos relatórios
      this.reports = [
        { title: 'Relatório 1', details: 'Detalhes do Relatório 1' },
        { title: 'Relatório 2', details: 'Detalhes do Relatório 2' }
      ];
    },
    async fetchReports() {
      try {
        let response = await axios.get('/api/reports'); // Substitua pela sua API
        this.reports = response.data; // espera que a resposta contenha os relatórios
      } catch (error) {
        console.error('Erro ao buscar os relatórios:', error);
      }
    }
  }
};
</script>
