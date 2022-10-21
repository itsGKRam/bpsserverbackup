import { Button } from '@mantine/core';
import { useGlobalStore } from '@store/index';

export default function HomeScreen() {
    const loading = useGlobalStore((s) => s.loading);

    return (
        <div>
            <text className={` bps-font-bold bps-text-3xl`}>HomeScreen</text>
            <Button loading={loading}>Hello Mantine</Button>
        </div>
    );
}
