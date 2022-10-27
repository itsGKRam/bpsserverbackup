import RootLayout from '@components/layouts/rootLayout';
import Profile from '@components/Menu/profile';

function ProfileScreen() {
    return <Profile />;
}

export default ProfileScreen;

ProfileScreen.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};
