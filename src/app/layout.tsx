import type { Metadata } from 'next';
import AppAppBar from './Nav';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

export const metadata: Metadata = {
  title: 'Reservations',
  description: 'Self-serve reservations for healthcare providers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <CssBaseline />

        <AppAppBar mode='light' />

        <Container maxWidth='lg' component='main' sx={{ mt: 10, p: 2 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
