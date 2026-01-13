# Frontend

Este repositório contém o front-end de uma aplicação de gerenciamento de filmes, desenvolvida para o teste técnico da empresa [LWSA | King Host](https://king.host/hospedagem-de-sites).


## Tecnologias utilizadas

* **Vue.js 3** (Composition API)
* **Vite**
* **Vue Router**
* **Pinia**
* **TypeScript**
* **SCSS (CSS Modules)**

## Instalação

### Pré-requisitos

* Node.js **>= 18**
* npm

### Instalação

```bash
npm install
```

### Variáveis de ambiente

O frontend consome APIs separadamente. Certifique-se de que:

* O backend esteja rodando (Acesse-o [aqui](https://github.com/anaahnb/favorite-movies-api) para saber mais sobre a instalação)
* As variáveis de ambiente estejam configuradas corretamente, conforme o tutorial abaixo:

Na raiz desse repositório, existe um arquivo `.env.example`. Duplique o arquivo e renomeie a cópia para `.env`.

### Como obter a chave da API do TMDB

Este projeto utiliza a API do The Movie Database (TMDB) para buscar filmes, imagens e informações relacionadas.

### Passo a passo para gerar a chave

1.  Acesse o site oficial do [TMDB](https://www.themoviedb.org/) e crie uma conta gratuita ou faça login.

3.  Após logar, acesse as configurações da sua conta:
    - Clique na sua foto de perfil

    - Vá em **Settings** → **API**

4.  Solicite uma **API Key (v3 auth)**:

    - Preencha o formulário solicitado

    - Escolha o uso como _Developer_

5.  Após aprovação, copie a **API Key gerada e preencha em** `VITE_TMDB_API_KEY` que está no arquivo `.env`


```env
VITE_TMDB_API_KEY=suachave_aqui
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```


### Executar em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```

## Rotas da aplicação


### Rotas públicas

| Caminho        | Nome    | Descrição                                       |
| -------------- | ------- | ----------------------------------------------- |
| `/`            | index   | Página inicial com listagem de filmes populares |
| `/details/:id` | details | Detalhes de um filme específico                 |

### Rotas protegidas

| Caminho      | Nome      | Descrição                            |
| ------------ | --------- | ------------------------------------ |
| `/favorites` | favorites | Lista de filmes favoritos do usuário |


## Estrutura de pastas

```
src/
 ├─ api/            # Chamadas HTTP
 ├─ assets/         # Imagens, ícones e arquivos estáticos
 │   └─ img/
 ├─ components/     # Componentes reutilizáveis
 ├─ pages/          # Páginas da aplicação
 ├─ plugins/        # Configurações de plugins
 ├─ stores/         # Pinia stores
 ├─ util/           # Helpers e utils
 ├─ types/          # Tipagens TypeScript
 └─ routes.ts       # Configuração do Vue Router

```

## Demonstração

[Vídeo de demonstração da plataforma](https://raw.githubusercontent.com/anaahnb/favorite-movies/main/assets/video/website.mov)


