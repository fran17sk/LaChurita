import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from 'react-router-dom'

function NavVar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink to='/'><Navbar.Brand className='LinkNavVar'>LA CHURITA</Navbar.Brand></NavLink>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Nav.Link><span><NavLink to='/seccion_new_pedido'>Nuevo Pedido</NavLink></span></Nav.Link>
                    <Nav.Link><span><NavLink to='/seccion_mozo'>Seccion Mozo</NavLink></span></Nav.Link>
                    <Nav.Link><span><NavLink to='/seccion_new_pedido'>Seccion Cocina</NavLink></span></Nav.Link>
                    <Nav.Link><span><NavLink to='/seccion_new_pedido'>Pedidos Del Dia</NavLink></span></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
);
}

export {NavVar};