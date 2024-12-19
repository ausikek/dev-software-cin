# Trainify

Aplicativo desenvolvido durante a disciplina de Desenvolvimento de Software, no semestre 2024.2

## O que é?

Trainify é um aplicativo moderno desenvolvido para facilitar a organização, monitoramento e otimização de treinos físicos. Seu objetivo é proporcionar uma experiência intuitiva e eficiente tanto para usuários iniciantes quanto avançados, ajudando a alcançar suas metas de condicionamento físico.

## Tecnologias

Estamos no estágio de MVP, utilizando somente Next.js tanto no front quanto back-end. Ainda não há persistência de dados.

Nas próximas fases, teremos front-end com Next.js, back-end com Flask, e o banco de dados será o MongoDB.

## Estrutura do projeto

```
├── client
│   ├── components.json
│   ├── Dockerfile
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── node_modules
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── public
│   ├── src
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── docker-compose.yml
├── LICENSE
├── README.md
└── server
    ├── Dockerfile
    ├── Pipfile
    ├── Pipfile.lock
    ├── run.py
    └── src
```

## Executando Localmente

### 1. Clonando o repositório

```sh
git clone https://github.com/ausikek/dev-software-cin.git
```

### 2. Navegar até a pasta client

```sh
cd dev-software-cin/client
```

### 3. Executar a versão de desenvolvimento

```sh
npm install pnpm
pnpm install
pnpm dev
```

**Você precisa ter Node e NPM instalados em sua máquina. Deve ser criado, além disso, um arquivo .env.local na raiz de client com as entradas GEMINI_KEY e NEXT_PUBLIC_API_URL. Na segunda, coloque http://localhost:3000.**

## Deploy

O deploy do MVP fullstack foi feito na Vercel.

## Equipe
#### Breno Orapacen
#### Aline Acioly
#### Claudino 
#### Matheus Barbosa
#### Arthur Campos
