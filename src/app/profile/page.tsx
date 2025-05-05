/* eslint-disable max-len */
import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PencilSquare, Instagram, Linkedin, Facebook, Github, TwitterX, Globe } from 'react-bootstrap-icons';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { Resource } from '@prisma/client';
import YourResources from '@/components/YourResources';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as { user: { email: string; id: string; randomKey: string }; }
    | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const user = await prisma.user.findUnique({
    where: { email: owner },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      occupation: true,
      bio: true,
      phone: true,
      major: true,
      standing: true,
      campus: true,
      personal: true,
    },
  });
    // Get resources for this user from database
  let resources: Resource[] = [];

  try {
    resources = await prisma.resource.findMany({
      where: {
        ...(owner ? { owner: (session && session.user && session.user.email) || '' } : {}),
      },
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <main id="hasBG" style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden' }}>
      <Container className="py-3">
        <h2><b>Your Profile</b></h2>
        <Col style={{ float: 'left', width: '60%', height: '100vh' }}>
          <Row id="profile-box" className="d-flex flex-column" style={{ height: '35%' }}>
            <Image className="" src={user?.image} style={{ padding: 0, width: 'auto', height: '100%' }} />
            <h3 className=""><b>{user?.name}</b></h3>
            <h5 className="">{user?.occupation}</h5>
            <br />
            <h6 className="">
              <b>Email Address:</b>
              {' '}
              {user?.email}
            </h6>
            <h6 className="">
              <b>Phone Number:</b>
              {' '}
              {user?.phone}
            </h6>
            <h6 className="">
              <b>Standing:</b>
              {' '}
              {user?.standing}
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
            <Row style={{ maxWidth: '100%', overflow: 'scroll' }}>
              <YourResources initialResources={resources} />
            </Row>
          </Row>
        </Col>
        <Col style={{ float: 'left', width: '40%' }}>
          <Row id="profile-box" className="" style={{ backgroundColor: 'white', height: '100vh' }}>
            <h4>
              <b>BIO</b>
              <Button variant="none" href={`edit/${user?.id}`} style={{ color: '#363636', float: 'right', padding: 'none' }}><PencilSquare style={{ height: '20px', width: 'auto' }} /></Button>
            </h4>
            <Container>
              <h6>{user?.bio}</h6>
            </Container>
            <hr />
            <h4><b>Other Information</b></h4>
            <Container>
              <h6>
                <b>Major:</b>
                {' '}
                {user?.major}
              </h6>
              <h6>
                <b>Standing:</b>
                {' '}
                {user?.standing}
              </h6>
              <h6>
                <b>Campus:</b>
                {' '}
                {user?.campus}
              </h6>
              <h6>
                <b>Phone Number:</b>
                {' '}
                {user?.phone}
              </h6>
              <h6>
                <b>Personal Email:</b>
                {' '}
                {user?.personal}
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
