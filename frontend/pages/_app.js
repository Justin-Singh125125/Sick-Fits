import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";


class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        //this exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps }
    }

    render() {

        //allows us to share state across all pages that we want
        const { Component, apollo, pageProps } = this.props;
        return (
            <div>
                <Container>
                    <ApolloProvider client={apollo}>
                        <Page>
                            <Component {...pageProps} />
                        </Page>
                    </ApolloProvider>
                </Container>
            </div>
        );
    }
}

export default withData(MyApp);