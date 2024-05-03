# Portfolio de Fotografia Online

Bem-vindo ao meu projeto de portfolio online para fotógrafos! Esta plataforma permite que os fotógrafos exibam seu trabalho de forma profissional, enquanto os usuários podem navegar por diferentes álbuns, favoritar e avaliar as imagens.

## Funcionalidades Principais

- Exibição de portfólio de fotografia profissional.
- Navegação por álbuns de fotos.
- Favoritar e avaliar imagens.
- Extração de metadados das imagens, como data e hora de captura, utilizando o EXIF.
- Painel de administração para upload de novas fotos e gerenciamento de conteúdo.

## Tecnologias Utilizadas

- Desenvolvido em React.
- Armazenamento de imagens e dados na nuvem utilizando Firebase Cloud.
  
## Como Configurar o Projeto

1. Clone este repositório em sua máquina local:

```
git clone git@github.com:vCiolac/lentes-e-fotografia.git
```

2. Instale as dependências do projeto:

```
npm install
```

3. Crie uma conta no [Firebase](https://firebase.google.com/) e configure seu projeto para usar os serviços de autenticação, armazenamento e banco de dados Firestore (Authentication, Storage e Firestore Database).

4. Renomeie o arquivo `.env.example` para `.env` e preencha as informações fornecidas pelo Firebase:

```
VITE_REACT_APP_FIREBASE_API_KEY="SuaAPIKey"
VITE_REACT_APP_FIREBASE_AUTH_DOMAIN="SeuAuthDomain"
VITE_REACT_APP_FIREBASE_PROJECT_ID="SeuProjectID"
VITE_REACT_APP_FIREBASE_STORAGE_BUCKET="SeuStorageBucket"
VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID="SeuMessagingSenderId"
VITE_REACT_APP_FIREBASE_APP_ID="SeuAppID"
VITE_REACT_APP_FIREBASE_MEASUREMENT_ID="SeuMeasurementID"
VITE_REACT_APP_ADMIN_UID="SeuAdminUID"
```

5. Configure a autenticação do Google OAuth no Firebase e preencha as informações no arquivo `.env`:

```
VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_ID="SeuClientID"
VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET="SeuClientSecret"
```

6. Edite o arquivo `src/components/Header/Header.tsx` para adicionar sua própria imagem de header.

7. Edite o arquivo `src/components/Footer/Footer.tsx` para exibir seu próprio nome.

## Observações

- O projeto inclui uma função de filtragem de busca por data e hora das fotos, útil para fotógrafos de eventos.
- Certifique-se de configurar corretamente as imagens de header e o nome exibido no footer antes de implantar o projeto.
