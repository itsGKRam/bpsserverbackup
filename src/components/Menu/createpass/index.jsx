import Axios from '@axios/index';
import { passCategories, passTypes } from '@components/common/staticData';
import { Button, Card, Divider, Select, Text, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import useSWR from 'swr';

export default function CreatePass() {
    const RegionData = useSWR('/auth/regions/get-all-regions');
    const RoutesData = useSWR('/auth/routes/get-all-routes');

    const [selectedRoute, setSelectedRoute] = React.useState({});
    console.log(
        '🚀 ~ file: index.jsx ~ line 15 ~ CreatePass ~ selectedRoute',
        selectedRoute,
    );

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
                category: values.passCategory,
                startDate: values.passStartDate,
                endDate: new Date(
                    values.passStartDate.getTime() +
                        1000 *
                            60 *
                            60 *
                            24 *
                            passTypes.find(
                                (item) => item.value === values.passType,
                            ).days,
                ),
                passType: values.passType,
            };

            if (values.passCategory === 'a2b') {
                data = {
                    ...data,
                    details: {
                        passFrom: values.passFrom,
                        passTo: values.passTo,
                    },
                };
            }

            if (values.passCategory === 'region') {
                data = {
                    ...data,
                    details: {
                        passRegion: values.passRegion,
                    },
                };
            }

            return data;
        },
    });

    const HandleCreatePass = async (e) => {
        console.log(e);
        const api = Axios.init();
        const { data } = await api.auth.createNewPass(e);
        createPassForm.reset();
        showNotification({
            message: data?.message,
        });
    };

    return (
        <div className=' bps-h-full bps-flex bps-flex-col bps-items-center bps-gap-3'>
            <Title>Create Pass</Title>
            <Divider className=' bps-w-full' />
            <div className=' bps-h-full bps-w-full bps-flex bps-flex-col lg:bps-flex-row bps-gap-3'>
                <Card className=' bps-w-full lg:bps-w-full bps-h-full'>
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
                        'a2b' ? (
                            <>
                                <Select
                                    data={
                                        RoutesData?.data
                                            ? RoutesData?.data?.Routes?.map(
                                                  (_, i) => {
                                                      return {
                                                          label: _.Bus.Name,
                                                          value: _.Bus.Name,
                                                      };
                                                  },
                                              )
                                            : ['Something went Wrong']
                                    }
                                    required
                                    searchable
                                    clearable
                                    onChange={(e) => {
                                        const data =
                                            RoutesData?.data?.Routes?.filter(
                                                (_) => _.Bus.Name === e,
                                            );
                                        setSelectedRoute(data);
                                        createPassForm.setFieldValue(
                                            'passFrom',
                                            e?.split('-')[0],
                                        );
                                        createPassForm.setFieldValue(
                                            'passTo',
                                            e?.split('-')[1],
                                        );
                                    }}
                                    label='Search Route'
                                    placeholder='Enter your location'
                                    className=' bps-w-full'
                                />
                            </>
                        ) : (
                            <Select
                                data={
                                    RegionData?.data
                                        ? RegionData?.data?.regions?.map(
                                              (_, i) => ({
                                                  label: _.Name,
                                                  value: _.Name,
                                              }),
                                          )
                                        : []
                                }
                                required
                                searchable
                                clearable
                                label='Region'
                                placeholder='Enter your region'
                                className=' bps-w-full'
                                {...createPassForm.getInputProps('passRegion')}
                            />
                        )}
                        <Select
                            label='Select Type'
                            placeholder='Select Type'
                            required
                            className=' bps-w-full'
                            data={passTypes}
                            {...createPassForm.getInputProps('passType')}
                        />
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
                        <div className=' bps-w-full bps-flex bps-flex-row bps-items-center bps-justify-end'>
                            <div className=' bps-text-end'>
                                {selectedRoute.length > 0 && (
                                    <>
                                        <Text>
                                            Per Mile {`(A)`} ={' '}
                                            {selectedRoute[0]?.Bus?.Fare}
                                        </Text>
                                        <Text>
                                            Total Distance {`(B)`} ={' '}
                                            {selectedRoute[0]?.Bus?.Distance}
                                        </Text>
                                        <Text>
                                            Total Amount {`(A*B)`} ={' '}
                                            {selectedRoute[0]?.Bus?.Fare *
                                                selectedRoute[0]?.Bus?.Distance}
                                        </Text>
                                    </>
                                )}
                            </div>
                        </div>

                        <Button type='submit'>Pay</Button>
                    </form>
                </Card>
                {/* <Card className=" bps-p-0 bps-relative bps-w-full  lg:bps-w-[70%] bps-h-full">
                    <Image src="https://developers.google.com/static/maps/images/landing/dds.png" alt="Sample" fill />
                </Card> */}
            </div>
        </div>
    );
}
