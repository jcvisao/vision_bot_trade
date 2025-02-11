<template>
  <div id="app">
    <!-- Sidebar e Menu -->
    <v-app>
      <v-navigation-drawer app v-model="drawer" temporary>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item to="/home">
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/create-bot">
              <v-list-item-content>
                <v-list-item-title>Criar Bot</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/bot-reports">
              <v-list-item-content>
                <v-list-item-title>Relatórios de Bots</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- Header -->
      <v-app-bar app>
        <v-toolbar-title>Vision Trade Bot</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout">Logout</v-btn>
      </v-app-bar>

      <!-- Conteúdo principal -->
      <v-main>
        <router-view></router-view> <!-- Área onde as rotas são renderizadas -->
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router)
  .mount('#app');
</script>

