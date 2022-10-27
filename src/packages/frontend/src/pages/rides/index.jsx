import RootLayout from '@components/layouts/rootLayout';
import Rides from '@components/Menu/rides';

function RidesScreen() {
    return <Rides />;
}

export default RidesScreen;

RidesScreen.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
