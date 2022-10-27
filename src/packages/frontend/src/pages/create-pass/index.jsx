import RootLayout from '@components/layouts/rootLayout';
import CreatePass from '@components/Menu/createpass';

function CreatePassScreen() {
    return <CreatePass />;
}

export default CreatePassScreen;

CreatePassScreen.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
