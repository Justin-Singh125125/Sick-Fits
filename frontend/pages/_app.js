import App, { Container } from "next/app";
import Page from "../components/Page";


class MyApp extends App {
    render() {

        //allows us to share state across all pages that we want
        const { Component } = this.props;
        return (
            <div>
                <Container>
                    <Page>
                        <Component />
                    </Page>
                </Container>
            </div>
        );
    }
}

export default MyApp;