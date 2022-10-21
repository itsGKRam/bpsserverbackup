import { Button, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

export default function Auth() {
    const router = useRouter();
    const theme = useMantineTheme();
    const [loading, setLoading] = React.useState(false);

    return (
        <Card className=' bps-w-[80%]  bps-flex bps-flex-col bps-gap-3'>
            <Text component='h1' color={theme.primaryColor}>
                <span className=' bps-text-4xl'>Login / Sign Up</span>
            </Text>
            <div id='recaptcha-container'></div>
            <div className=' bps-flex bps-flex-col bps-flex-1 bps-gap-3'>
                <Group className=' bps-flex bps-flex-col bps-flex-1 bps-gap-3'>
                    <Button
                        fullWidth
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        continue with Google
                    </Button>
                </Group>
            </div>
        </Card>
    );
}
