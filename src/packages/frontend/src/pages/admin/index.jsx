import RootLayout from '@components/layouts/rootLayout';
import Admin from '@components/Menu/admin';

function AdminScreen() {
    return <Admin />;
}

export default AdminScreen;

AdminScreen.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
