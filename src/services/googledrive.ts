import { google } from 'googleapis';

// Crie um cliente OAuth2
const oauth2Client = new google.auth.OAuth2(
  import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_REDIRECT_URI,
);

export async function listFiles(accessToken: string) {
  try {
    // Configure o OAuth2Client com o token de acesso
    oauth2Client.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const response = await drive.files.list({
      pageSize: 10,
    });
    const files = response.data.files;

    console.log('Arquivos no Drive:', files);
  } catch (error) {
    console.error(error);
    throw error;
  }
}