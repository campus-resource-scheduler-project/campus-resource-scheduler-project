/* eslint-disable max-len */
/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image, DropdownButton } from 'react-bootstrap';
import { BoxArrowRight, Lock, Person, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#095A3E' }}>
      <Container>
        <Navbar.Brand href="/">
        <Image
          src="/logo-text.png"
          width={200}
          height={75}
          alt="logo"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id="navbar-options" className="ms-auto justify-content-end align-items-center">
            {currentUser
              ? [
                  <Nav.Link id="add-stuff-nav" href="/available-equipment" key="equipment" active={pathName === '/'}>
                    Equipment
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/available-rooms" key="rooms" active={pathName === '/'}>
                    Rooms
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/resources" key="your" active={pathName === '/resources'}>
                    Your Resources
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/" key="loanlink" active={pathName === '/'}>
                    LoanLink
                  </Nav.Link>,

                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav>
            {session ? (
            <DropdownButton id="logged-in" title={currentUser} size="lg" className="mt-2 rounded-0" variant="none" style={{ backgroundColor: '#363636', border: 'none' }}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/profile">
                <Person />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>
            </DropdownButton>
            ) : (
            <DropdownButton size="lg" className="mt-2 rounded-0" variant="none" style={{ backgroundColor: '#363636', border: 'none' }} title="Login" id="login-dropdown">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  {' '}
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  {' '}
                  Sign Up
                </NavDropdown.Item>
            </DropdownButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
