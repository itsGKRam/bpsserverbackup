import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function AdminBusRegionCreateNew() {
    const CreateNewRegionForm = useForm({
        initialValues: {
            regionName: '',
        },
        validate: {
            regionName: (value) => {
                if (!value) {
                    return 'Region Name is required';
                }
            },
        },
    });

    const HandleCreateNewRegion = (e) => {
        console.log(e);
    };

    return (
        <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
            <form
                onSubmit={CreateNewRegionForm.onSubmit((values) =>
                    HandleCreateNewRegion(values),
                )}
                className=' bps-flex bps-flex-col bps-gap-3'
            >
                <TextInput
                    label='Region Name'
                    required
                    placeholder='Name'
                    className='bps-w-full'
                    {...CreateNewRegionForm.getInputProps('regionName')}
                />
                <Button type='submit' variant='outline' color='blue'>
                    Create Region
                </Button>
            </form>
        </div>
    );
}

export default AdminBusRegionCreateNew;
