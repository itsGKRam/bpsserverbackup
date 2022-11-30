export default function PassCard(p) {
    const props = {
        key: p.key,
        item: p.item,
    };
    // const [qrURL, setQRURL] = React.useState(null);
    // const user = useGlobalStore((state) => state.user);

    // React.useEffect(async () => {
    //     const res = await QRCode.toDataURL(
    //         JSON.stringify({
    //             ...props?.item,
    //             userID: user?._id,
    //             userName: user?.Name,
    //             userEmail: user?.Email,
    //         }),
    //     );

    //     // create a sample QR code from a string

    //     console.log(res);
    // }, []);

    return (
        <div key={props.key}>
            Need to create a card for the pass that will contain the QR code and
            details about the pass.
        </div>
    );
}
