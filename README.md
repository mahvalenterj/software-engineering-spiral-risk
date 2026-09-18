# SpiralRisk — Simulador de Ciclo de Vida de Software & Gestão de Riscos de Boehm

Link da demo: Em breve (Vercel/Netlify)

## Sobre o Projeto

SpiralRisk é uma aplicação web interativa que recomenda o modelo de ciclo de vida de desenvolvimento (SDLC) mais adequado ao contexto de um projeto e simula visualmente as quatro regiões do Modelo Espiral de Barry Boehm. A ferramenta combina avaliação de risco, complexidade, prazo e estabilidade de requisitos para orientar decisões de engenharia em projetos com diferentes níveis de incerteza.

A solução foi construída como uma SPA em React + TypeScript e usa SVG nativo para renderizar a espiral e os indicadores de custo e risco residual ao longo das voltas.

## Prints / GIF

- Visualização radial da espiral e evolução de risco ao longo das iterações
- Tabela comparativa de recomendação de SDLC por score
- Matriz de risco probabilístico-qualitativo da aplicação

## Fundamentação Teórica

Cascata é um modelo linear, adequado quando requisitos são estáveis e mudanças são pouco prováveis. Ele prioriza previsibilidade e disciplina, mas se torna rígido em cenários com alto grau de incerteza.

O Modelo V é orientado a verificação e validação, com foco em garantir que cada fase de desenvolvimento tenha critérios de garantia de qualidade alinhados ao produto final. Ele combina bem com projetos críticos, regulatórios ou com alta exigência de controle.

A espiral, por sua vez, é orientada a risco: a cada volta, o time define objetivos, analisa e mitiga riscos, entrega uma parte do produto e avalia progresso com o cliente. Esse modelo é especialmente útil quando a incerteza é alta, a complexidade é grande e a mudança de requisitos é inevitável.

## Como executar localmente

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Validação

```bash
npm run build
npm test
```
