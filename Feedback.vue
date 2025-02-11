<template>
  <div class="feedback-modal">
    <div v-for="(question, index) in questions" :key="index">
      <label>{{ question }}</label>
      <input type="radio" v-model="responses[index]" value="Sim"> Sim
      <input type="radio" v-model="responses[index]" value="Não"> Não
    </div>
    <button @click="submitFeedback">Enviar Feedback</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        'Você encontrou dificuldades ao usar o sistema?',
        'Qual sua experiência geral?'
      ],
      responses: [] // Respostas armazenadas
    };
  },
  methods: {
    submitFeedback() {
      console.log('Feedback enviado:', this.responses);
      // ...lógica para enviar o feedback (ex: chamada de API)...
    }
  }
}
</script>

<style scoped>
.feedback-modal {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
