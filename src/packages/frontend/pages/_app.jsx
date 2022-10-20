import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [colorScheme, setColorScheme] = React.useState('dark');
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'light' ? 'dark' : 'light'));
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>Bus Pass System</title>
            </Head>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme,
                    }}
                >
                    <NotificationsProvider>
                        <ModalsProvider>
                            <div className=' bps-flex bps-flex-col bps-relative bps-w-screen bps-h-screen'>
                                {getLayout(<Component {...pageProps} />)}
                            </div>
                        </ModalsProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

export default MyApp;
