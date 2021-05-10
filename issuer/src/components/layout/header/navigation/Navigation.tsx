import React, {useContext, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Container, Nav, Navbar, NavbarBrand} from 'react-bootstrap'
import {routes} from 'constants/routes'
import 'components/layout/header/navigation/Navigation.scss'
import AppContext from 'context/app';
import UserLogout from 'components/user/logout/Logout';
import drivingLicenseLogo from 'assets/images/icons/driving-license.svg';
import Red_Cross from 'assets/images/icons/Red_Cross.png';
import companyNameLogo from 'assets/images/icons/company-name.png';

/**
 * Stateful component responsible for rendering the top navigation of this application.
 * There are 2 main navigation blocks: for authenticated and non-authenticated user.
 * Non-authenticated user will be able to see links to "Register" and "Login", while
 * authenticated user will be able to see the "Logout" link and his username.
 * */
const LayoutHeaderNavigation = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const {appState} = useContext(AppContext)

  // In order to fix the "findDOMNode" warning in the navbar collapse component,
  // a custom toggle control function was implemented. Currently, some bootstrap components
  // are not up-to-date with React standards, and this is considered a quick-fix until
  // bootstrap components are updated.
  return (
    <Navbar expand="lg"
            onToggle={() => setShowNavbar(!showNavbar)}
            expanded={false}
            className='bg-orange'
    >
      <Container>
        <NavbarBrand>
          <Link to={routes.ROOT}>
            <img src={Red_Cross} className='logo-icon' alt='logo'/>
            {/* <img src={companyNameLogo} className='logo-name' alt='logo-name'/> */}
            <span className="font-weight-bold text-dark px-2">Quality Assurance Agency of China (Issuer)</span>
          </Link>
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={showNavbar ? 'show' : ''}>
          <Nav className="justify-content-end">
            {appState.isAuthenticated && (
              <>
                <Nav.Item>
                  <Nav.Link as={'span'} className='user-logout'>
                    <UserLogout />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={'span'}>
                    <span>| Hello, {appState.username}</span>
                  </Nav.Link>
                </Nav.Item>
              </>
            )}

            {!appState.isAuthenticated && (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} activeClassName='is-active' to={routes.APPLICANT_LOGIN}>Start applying</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} activeClassName='is-active' to={routes.ISSUER_LOGIN}>Sign in as admin</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default LayoutHeaderNavigation