# 🎵 Régua Musical Interativa - Padrões de Escalas

Sistema web interativo para visualização dinâmica, estudo e ensino do padrão de formação de escalas musicais (Tons e Semitons) sobre a escala cromática.

Inspirado no modelo visual pedagógico de réguas de cálculo harmônico e na apresentação original de Padrões de Escalas Maiores.

---

## ✨ Funcionalidades

- **Régua Fixa de Intervalos (SVG Dinâmico):**
  - Arcos com cantos arredondados indicando saltos de **TOM** (2 semitons).
  - Picos em ângulo indicando saltos de **SEMITOM** (1 semitom).
  - Arcos estendidos para saltos aumentados (**1½ TOM**, como na Menor Harmônica).
  - Indicador de **Tônica (Grau I)** alinhado à nota de partida.
- **Fita Cromática Infinita (Rolagem Horizontal Contínua):**
  - Sequência cromática completa com suporte a arrasto por toque (mobile) ou mouse.
  - Rolagem infinita contínua em ambas as direções.
  - **Efeito Magnético (Snap):** Encaixe automático e alinhamento milimétrico na nota mais próxima ao soltar.
  - Células com organização vertical espaçada para **Nota**, **Enarmonia** e **Grau**.
- **Ampla Biblioteca de Padrões:**
  - Escala Maior Natural ($T - T - ST - T - T - T - ST$)
  - Menor Natural (Modo Eólio) ($T - ST - T - T - ST - T - T$)
  - Menor Harmônica ($T - ST - T - T - ST - 1\frac{1}{2}T - ST$)
  - Menor Melódica ($T - ST - T - T - T - T - ST$)
  - Pentatônica Maior e Pentatônica Menor
  - Escala Blues (com Blue Note)
  - Modos Gregos (Dórico, Frígio, Lídio, Mixolídio, Lócrio)
- **Preferências de Notação e Teoria:**
  - Alternância entre Sustenidos ($\sharp$), Bemóis ($\flat$) ou Ambos ($\sharp/\flat$).
  - Nomenclatura em português (*Dó, Ré, Mi...*) ou cifras americanas (*C, D, E...*).
  - Ortografia diatônica ajustada por tonalidade.
- **Síntese de Áudio (Web Audio API):**
  - Botão **▶ Ouvir Escala** com arpejo sonoro e animação sincronizada dos graus.
  - Toque individual ao clicar em qualquer nota da fita.
- **Navegação Ágil:**
  - Teclas de atalho no teclado ($\leftarrow$ e $\rightarrow$ para semitons, barra de espaço para tocar).
  - Botões rápidos de seleção direta de Tônica (Dó a Si).

---

## 🚀 Como Executar Localmente

### Opção 1: Direto no Navegador (Sem Instalação)
Basta abrir o arquivo `index.html` em qualquer navegador moderno.

### Opção 2: Servidor Local (Node.js)
```bash
node server.js
```
Abra o navegador em: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Arquivos

```
escala-interativa/
├── index.html     # Estrutura HTML5 semântica e acessível
├── style.css      # Design responsivo, tema dark e animações
├── app.js         # Lógica musical, SVG dinâmico, fita infinita e áudio
├── server.js      # Servidor HTTP nativo em Node.js (sem dependências)
└── README.md      # Documentação do projeto
```

---

## 📄 Licença

Distribuído sob a licença MIT. Sinta-se livre para utilizar em suas aulas e estudos!
