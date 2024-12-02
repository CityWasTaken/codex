import { Container } from "react-bootstrap";

function Footer() {
    const date = new Date();

    return (
            <footer className="bg-light">
                <Container className="d-flex justify-content-between py-5">
                <p>Copyright &copy; {date.getFullYear()} Codex</p>
                <p>Dev & Design by City Smith, Adonis Zepeda, Kandyce Mbua, and Rita Aponte</p>
                </Container>
            </footer>
    )
}

export default Footer;