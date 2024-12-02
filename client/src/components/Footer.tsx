import { Container } from "react-bootstrap";

function Footer() {
    const date = new Date();

    return (
            <footer className="bg-light">
                <section className="d-flex justify-content-between py-5">
                <p>Copyright &copy; {date.getFullYear()} </p>
                <p>Dev & Design by City Smith, Adonis Zepeda, Kandyce Mbua, and Rita Aponte</p>
                </section>
            </footer>
    )
}

export default Footer;