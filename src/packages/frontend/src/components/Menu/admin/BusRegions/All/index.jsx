import { Button, Table, TextInput } from '@mantine/core';

function AdminBusRegionsAll() {
    const elements = [
        { id: 6, Region: 12.011 },
        { id: 7, Region: 14.007 },
        { id: 39, Region: 88.906 },
        { id: 56, Region: 137.33 },
        { id: 58, Region: 140.12 },
    ];

    const rows = elements.map((element) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.Region}</td>
        </tr>
    ));

    return (
        <div className=' bps-w-full bps-flex bps-flex-col bps-gap-3'>
            <form>
                <div className=' bps-flex bps-flex-row bps-items-center bps-gap-3'>
                    <TextInput placeholder='Search' className='bps-w-full' />
                    <Button type='submit'>Search</Button>
                </div>
            </form>
            <Table highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

export default AdminBusRegionsAll;
