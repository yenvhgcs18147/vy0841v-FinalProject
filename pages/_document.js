import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <Head>
                    <meta name="Chocolate-web" content="E-commerce website with Next.js" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <script src ="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
                    <script src ="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
                    <script src ="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument