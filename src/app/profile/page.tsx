/* eslint-disable max-len */
import { Col, Container, Row, Image } from 'react-bootstrap';
import { PencilSquare, Instagram, Linkedin, Facebook, Github, TwitterX, Globe } from 'react-bootstrap-icons';

export default function ProfilePage() {
  return (
    <main id="hasBG" style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden' }}>
      <Container className="py-3">
        <h2><b>Your Profile</b></h2>
        <Col style={{ float: 'left', width: '60%', height: '100vh' }}>
          <Row id="profile-box" className="d-flex flex-column" style={{ height: '35%' }}>
            <Image className="" src="/genericdude.png.webp" style={{ padding: 0, width: '225px', height: '225px' }} />
            <h3 className=""><b>John Foo</b></h3>
            <h5 className="">Computer Science Major</h5>
            <br />
            <h6 className="">
              <b>Email Address:</b>
              {' '}
              john@foo.com
            </h6>
            <h6 className="">
              <b>Phone Number:</b>
              {' '}
              (808) 432-1234
            </h6>
            <h6 className="">
              <b>Standing:</b>
              {' '}
              Junior
            </h6>
            <h6>
              <Instagram id="account-icons" />
              <Linkedin id="account-icons" />
              <Github id="account-icons" />
              <Facebook id="account-icons" />
              <TwitterX id="account-icons" />
              <Globe id="account-icons" />
            </h6>
          </Row>
          <Row id="profile-box" style={{ backgroundColor: 'white', height: '61%' }}>
            <h3><b>Your Resources</b></h3>
          </Row>
        </Col>
        <Col style={{ float: 'left', width: '40%' }}>
          <Row id="profile-box" className="" style={{ backgroundColor: 'white', height: '100vh' }}>
            <h4>
              <b>BIO</b>
              <PencilSquare style={{ float: 'right' }} />
            </h4>
            <Container>
              <h6>CS Major at WCC.</h6>
              <h6> I am unemployed.</h6>
              <h6> I need resources n stuff.</h6>
            </Container>
            <hr />
            <h4><b>Other Information</b></h4>
            <Container>
              <h6>
                <b>Major:</b>
                {' '}
                Computer Science
              </h6>
              <h6>
                <b>Standing:</b>
                {' '}
                Junior
              </h6>
              <h6>
                <b>Campus:</b>
                {' '}
                Windward Community College
              </h6>
              <h6>
                <b>Phone Number:</b>
                {' '}
                (808) 432-1234
              </h6>
              <h6>
                <b>Personal Email:</b>
                {' '}
                johnfoo@gmail.com
              </h6>

            </Container>
            <hr />
            <h4><b>Account Data</b></h4>
            <Container>
              <h6>Account Created On: April 6, 2025</h6>
              <h6>Last Updated: April 18, 2025</h6>
            </Container>
          </Row>
        </Col>
      </Container>
    </main>
  );
}
