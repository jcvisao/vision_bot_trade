<template>
  <div class="dashboard">
    <h1>Painel do Bot</h1>
    <!-- Container para os nós interativos -->
    <div id="nodes-container" class="nodes-container"></div>
    <div class="dashboard-buttons">
      <router-link to="/bot-reports">Gerar Relatórios</router-link>
      <router-link to="/node-configuration">Configurar Nós</router-link>
      <router-link to="/create-bot">Criar Novo Bot</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  mounted() {
    this.initNodesReal();
  },
  methods: {
    initNodesReal() {
      // Limpa o container
      const container = document.getElementById("nodes-container");
      container.innerHTML = "";

      // Cria um SVG para as conexões
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "connections-svg");
      svg.style.position = "absolute";
      svg.style.top = "0";
      svg.style.left = "0";
      svg.style.width = "100%";
      svg.style.height = "100%";
      container.appendChild(svg);
      window.svgConnections = svg;

      // Definições de classes simplificadas (você pode colar aqui todo o código legado)
      class BaseNode {
        constructor(id, label, type) {
          this.id = id;
          this.label = label;
          this.type = type;
          this.subNodes = [];
          this.error = false;
          this.element = document.createElement('div');
          this.element.classList.add('node', type);
          // Se for nó principal, exibe o logotipo
          if(this.type === 'principal'){
            this.element.innerHTML = `<img src="/LOGO_MG_BRAZIL.png" alt="Logotipo">`;
            this.element.style.boxShadow = "0 0 15px 5px #00ffff";
          } else {
            // Para outros nós, mostra um ícone e o rótulo
            this.element.innerHTML = `<i class="fas fa-${type}" style="font-size:32px;"></i><br><strong>${label}<br>(${id})</strong>`;
          }
          this.element.style.position = "absolute";
          // Tornar o nó arrastável (implementação simples)
          this.element.onmousedown = (e) => {
            const offsetX = e.clientX - this.element.offsetLeft;
            const offsetY = e.clientY - this.element.offsetTop;
            const onMouseMove = (ev) => {
              this.element.style.left = (ev.clientX - offsetX) + "px";
              this.element.style.top = (ev.clientY - offsetY) + "px";
              // Aqui você pode atualizar as conexões se necessário
            };
            document.addEventListener("mousemove", onMouseMove);
            document.onmouseup = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.onmouseup = null;
            };
          };
          // Estilo básico para o nó (você pode incluir mais animações e efeitos conforme o CSS original)
          this.element.style.width = "100px";
          this.element.style.height = "100px";
          this.element.style.background = "linear-gradient(135deg, #444, #222)";
          this.element.style.border = "2px solid #555";
          this.element.style.borderRadius = "50%";
          this.element.style.color = "#fff";
          this.element.style.textAlign = "center";
          this.element.style.lineHeight = "1.2";
          this.element.style.cursor = "pointer";
        }
        connectToNode(node) {
          this.subNodes.push(node);
          // Cria uma linha de conexão (bem simples)
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("stroke", "#fff");
          line.setAttribute("stroke-width", "2");
          window.svgConnections.appendChild(line);
          // Atualização simples: a cada 100ms, atualize a posição da linha
          setInterval(() => {
            const srcRect = this.element.getBoundingClientRect();
            const tgtRect = node.element.getBoundingClientRect();
            const x1 = srcRect.left + srcRect.width / 2;
            const y1 = srcRect.top + srcRect.height / 2;
            const x2 = tgtRect.left + tgtRect.width / 2;
            const y2 = tgtRect.top + tgtRect.height / 2;
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
          }, 100);
        }
      }
      
      class PrincipalNode extends BaseNode {
        constructor(id, label) {
          super(id, label, "principal");
        }
      }
      
      // Criação de alguns nós para exemplo
      const principal = new PrincipalNode("B1", "Orquestra Msg");
      principal.element.style.left = "300px";
      principal.element.style.top = "200px";
      container.appendChild(principal.element);
      
      const nodeA = new BaseNode("A1", "Config", "config");
      nodeA.element.style.left = "100px";
      nodeA.element.style.top = "100px";
      container.appendChild(nodeA.element);
      
      const nodeB = new BaseNode("A2", "Status", "status");
      nodeB.element.style.left = "500px";
      nodeB.element.style.top = "100px";
      container.appendChild(nodeB.element);
      
      // Conectar nós (exemplo simples)
      principal.connectToNode(nodeA);
      principal.connectToNode(nodeB);
      
      console.log("Interactive nodes initialized.");
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.nodes-container {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid #fff;
  margin-bottom: 20px;
}
.dashboard-buttons {
  margin-top: 20px;
  text-align: center;
}
.dashboard-buttons a {
  margin: 0 10px;
  color: #00ffff;
  text-decoration: none;
}
.node {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #444, #222);
  border: 2px solid #555;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 1.2;
  cursor: pointer;
  user-select: none;
  position: absolute;
}
.node img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
