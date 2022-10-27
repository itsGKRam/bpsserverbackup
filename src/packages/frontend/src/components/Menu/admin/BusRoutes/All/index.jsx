import { Button, Table, TextInput } from '@mantine/core';

function AdminBusRouteAll() {
    const elements = [
        { id: 6, From: 12.011, To: 'C', Timings: 'Carbon' },
        { id: 7, From: 14.007, To: 'N', Timings: 'Nitrogen' },
        { id: 39, From: 88.906, To: 'Y', Timings: 'Yttrium' },
        { id: 56, From: 137.33, To: 'Ba', Timings: 'Barium' },
        { id: 58, From: 140.12, To: 'Ce', Timings: 'Cerium' },
    ];

    const rows = elements.map((element) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.From}</td>
            <td>{element.To}</td>
            <td>{element.Timings}</td>
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
                        <th>From</th>
                        <th>To</th>
                        <th>Timings</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

export default AdminBusRouteAll;
