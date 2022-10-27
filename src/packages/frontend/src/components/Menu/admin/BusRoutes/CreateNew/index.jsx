import { timings } from '@components/common/staticData';
import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function AdminBusRouteCreateNew() {
    const CreateNewRouteForm = useForm({
        initialValues: {
            routeFrom: '',
            routeTo: '',
            routeTimings: '',
        },
        validate: {
            routeFrom: (value) => {
                if (!value) {
                    return 'Route From is required';
                }
            },
            routeTo: (value) => {
                if (!value) {
                    return 'Route To is required';
                }
            },
            routeTimings: (value) => {
                if (!value) {
                    return 'Route Timings is required';
                }
            },
        },
    });

    const HandleCreateNewRoute = (e) => {
        console.log(e);
    };

    return (
        <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
            <form
                onSubmit={CreateNewRouteForm.onSubmit((values) =>
                    HandleCreateNewRoute(values),
                )}
                className=' bps-flex bps-flex-col bps-gap-3'
            >
                <TextInput
                    label='From'
                    required
                    placeholder='From'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeFrom')}
                />
                <TextInput
                    label='To'
                    required
                    placeholder='To'
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeTo')}
                />
                <Select
                    label='Timings'
                    placeholder='Select Timings'
                    required
                    className='bps-w-full'
                    {...CreateNewRouteForm.getInputProps('routeTimings')}
                    data={timings}
                />
                <Button type='submit' variant='outline' color='blue'>
                    Create Route
                </Button>
            </form>
        </div>
    );
}

export default AdminBusRouteCreateNew;
