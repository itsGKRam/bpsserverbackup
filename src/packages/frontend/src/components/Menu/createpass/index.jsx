import { passCategories, passTypes } from '@components/common/staticData';
import { Button, Card, Divider, Select, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Image from 'next/image';

export default function CreatePass() {
    const createPassForm = useForm({
        initialValues: {
            passCategory: passCategories[0].value,
            passFrom: '',
            passTo: '',
            passRegion: '',
            passStartDate: new Date(),
            passType: passTypes[0].value,
            expiryDate: '',
        },

        transformValues: (values) => {
            let data = {
                passCategory: values.passCategory,
                passStartDate: values.passStartDate,
                passType: values.passType,
                expiryDate: new Date(
                    values.passStartDate.getTime() +
                        1000 *
                            60 *
                            60 *
                            24 *
                            passTypes.find(
                                (item) => item.value === values.passType,
                            ).days,
                ),
            };

            if (values.passCategory === 'A2B') {
                data = {
                    ...data,
                    passFrom: values.passFrom,
                    passTo: values.passTo,
                };
            }

            if (values.passCategory === 'Region') {
                data = {
                    ...data,
                    passRegion: values.passRegion,
                };
            }

            return data;
        },
    });

    const HandleCreatePass = (e) => {
        console.log(e);
        createPassForm.reset();
    };

    return (
        <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
            <Title>Create Pass</Title>
            <Divider className=' bps-w-full' />
            <div className=' bps-h-full bps-w-full bps-flex bps-flex-col lg:bps-flex-row bps-gap-3'>
                <Card className=' bps-w-full lg:bps-w-[30%] bps-h-full'>
                    <form
                        onSubmit={createPassForm.onSubmit((values) =>
                            HandleCreatePass(values),
                        )}
                        className=' bps-p-5 bps-flex bps-flex-col bps-gap-3'
                    >
                        <Select
                            label='Select Categories'
                            placeholder='Select Categories'
                            required
                            className=' bps-w-full'
                            data={passCategories}
                            {...createPassForm.getInputProps('passCategory')}
                        />
                        {createPassForm.getInputProps('passCategory').value ===
                        'A2B' ? (
                            <>
                                <TextInput
                                    required
                                    label='From'
                                    placeholder='Enter your location'
                                    className=' bps-w-full'
                                    {...createPassForm.getInputProps(
                                        'passFrom',
                                    )}
                                />
                                <TextInput
                                    required
                                    label='To'
                                    placeholder='Enter your location'
                                    className=' bps-w-full'
                                    {...createPassForm.getInputProps('passTo')}
                                />
                            </>
                        ) : (
                            <TextInput
                                required
                                label='Region'
                                placeholder='Enter your region'
                                className=' bps-w-full'
                                {...createPassForm.getInputProps('passRegion')}
                            />
                        )}

                        <div className=' bps-flex bps-flex-row bps-gap-3 bps-items-center'>
                            <DatePicker
                                className=' bps-flex-1'
                                required
                                label='Start Date'
                                placeholder='Enter your start date'
                                type='date'
                                {...createPassForm.getInputProps(
                                    'passStartDate',
                                )}
                            />
                            <DatePicker
                                className=' bps-flex-1'
                                label='Valid UpTo'
                                required
                                disabled
                                placeholder='Enter your valid upto'
                                type='date'
                                value={
                                    new Date(
                                        createPassForm
                                            .getInputProps('passStartDate')
                                            .value.getTime() +
                                            1000 *
                                                60 *
                                                60 *
                                                24 *
                                                passTypes.find(
                                                    (item) =>
                                                        item.value ===
                                                        createPassForm.getInputProps(
                                                            'passType',
                                                        ).value,
                                                ).days,
                                    )
                                }
                            />
                        </div>
                        <Select
                            label='Select Type'
                            placeholder='Select Type'
                            required
                            className=' bps-w-full'
                            data={passTypes}
                            {...createPassForm.getInputProps('passType')}
                        />
                        <Button type='submit'>Submit</Button>
                    </form>
                </Card>
                <Card className=' bps-p-0 bps-relative bps-w-full  lg:bps-w-[70%] bps-h-full'>
                    <Image
                        src='https://developers.google.com/static/maps/images/landing/dds.png'
                        alt='Sample'
                        fill
                    />
                </Card>
            </div>
        </div>
    );
}
