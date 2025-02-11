<template>
  <div id="principal-node">
    <!-- Exibe o logotipo (o caminho usa /LOGO_MG_BRAZIL.png, que deve estar na pasta public) -->
    <img src="/LOGO_MG_BRAZIL.png" alt="Logo da Plataforma" style="max-width:150px; display:block; margin: 0 auto;" />
    <!-- Exibe o componente de feedback (se implementado) -->
    <Feedback />
    <!-- Roteamento: o conteúdo das páginas é exibido aqui -->
    <router-view />
  </div>
</template>

<script>
import Feedback from './components/Feedback.vue'; // Certifique-se de ter esse componente ou remova se não for necessário

export default {
  name: 'App',
  components: {
    Feedback
  }
};
</script>

<style>
/* Estilos globais podem ser colocados aqui */
#principal-node {
  text-align: center;
  padding: 20px;
}
</style>
