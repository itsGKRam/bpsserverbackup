import Home from '@components/home';
import RootLaylot from '@components/layouts/rootLayout';

export default function HomeScreen() {
    return <Home />;
}

HomeScreen.getLayout = function getLayout(page) {
    return <RootLaylot>{page}</RootLaylot>;
};
