import Axios from '@axios/index';

import { Button, createStyles, Group, Modal, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';

const useStyles = createStyles((theme) => ({
    body: {
        display: 'flex',
        alignItems: 'center'
    },

    track: {
        width: 40,
        height: 6,
        overflow: 'visible'
    },

    thumb: {
        width: 20,
        height: 20,
        left: -2,
        transition: 'background-color 100ms ease, left 100ms ease',

        'input:checked + * > &': {
            backgroundColor: theme.fn.primaryColor()
        }
    }
}));

const TableRow = (p) => {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);

    const props = {
        key: p.key,
        item: p.item
    };

    console.log(props?.item);

    const CreateNewRegionForm = useForm({
        initialValues: {
            Name: props?.item?.Name || ''
        },
        validate: {
            Name: (value) => {
                if (!value) {
                    return 'Region Name is required';
                }
            }
        }
    });

    const HandleEditRegion = async (e) => {
        if (CreateNewRegionForm.validate()) {
            const api = Axios.init();
            const { data } = await api.auth.updateRegionById(props?.item?._id, e);
            CreateNewRegionForm.reset();
            showNotification({
                message: data?.message
            });
            setOpened(false);
        }
    };

    return (
        <>
            <tr key={props.key}>
                <th
                    className="bps-text-start hover:bps-underline bps-cursor-pointer"
                    onClick={() => {
                        setOpened(true);
                        setEditMode(false);
                    }}
                >
                    {props?.item?._id}
                </th>
                <th className="bps-text-start">{props?.item?.Name}</th>
            </tr>
            <Modal
                overflow="inside"
                size="lg"
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    setEditMode(false);
                }}
                title={`${props?.item?.Name}`}
            >
                <div>
                    <Group position="center" p="md">
                        <Switch
                            checked={editMode}
                            onChange={(e) => {
                                setEditMode(e.target.checked);
                            }}
                            value={true}
                            label="Edit Mode"
                            classNames={classes}
                        />
                    </Group>
                </div>
                <form onSubmit={CreateNewRegionForm.onSubmit((values) => HandleEditRegion(values))} className=" bps-flex bps-flex-col bps-gap-3">
                    <TextInput
                        variant={!editMode ? 'unstyled' : 'default'}
                        readOnly={!editMode}
                        label="Region Name"
                        withAsterisk={editMode}
                        placeholder="Name"
                        className="bps-w-full"
                        {...CreateNewRegionForm.getInputProps('Name')}
                    />
                    {editMode && (
                        <Button type="submit" variant="outline" color="blue">
                            Update Region
                        </Button>
                    )}
                </form>
            </Modal>
        </>
    );
};

export default TableRow;
