import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import Image from 'next/image';
import { Button } from 'react-bootstrap';

/** The Home page. */
const Home = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const isAdmin = email === 'admin@foo.com';
  const isJohn = email === 'john@foo.com';
  const isLoggedIn = isAdmin || isJohn;

  let resources: any[] = [];

  if (isJohn) {
    resources = await prisma.resource.findMany({
      where: { owner: 'admin@foo.com' },
      take: 3,
    });
  } else if (isAdmin) {
    resources = await prisma.resource.findMany({
      where: { NOT: { owner: 'admin@foo.com' } },
    });
  }

  // Not logged in view
  if (!isLoggedIn) {
    return (
      <main id="hasBG" style={{ overflowX: 'hidden' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <h1 style={{ color: 'black' }}>
              Welcome to
              {' '}
              <b>Campus Resource Scheduler!</b>
            </h1>
            <div className="row justify-content-center align-items-center">
              <div className="col-auto mx-5 text-center">
                <Button
                  size="lg"
                  id="landing-button"
                  className="mt-2 rounded-0"
                  href="/auth/signin"
                  style={{ backgroundColor: '#363636', border: 'none' }}
                >
                  <b>Borrow Equipment</b>
                </Button>
              </div>
              <div className="col-auto mx-5 text-center">
                <Button
                  size="lg"
                  id="landing-button"
                  className="mt-2 rounded-0"
                  href="/auth/signin"
                  style={{ backgroundColor: '#363636', border: 'none' }}
                >
                  <b>Borrow Rooms</b>
                </Button>
              </div>
            </div>
            <div className="mt-5 text-center">
              <h1 style={{ color: 'black', fontSize: '24px' }}>
                or try our
                {' '}
                <b>LoanLink</b>
                {' '}
                AI to help you find what you need.
              </h1>
              <Button
                size="lg"
                id="landing-button"
                className="mt-2 rounded-0"
                href="/auth/signin"
                style={{ backgroundColor: '#363636', border: 'none' }}
              >
                <b>LoanLink</b>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Admin view
  if (isAdmin) {
    return (
      <main id="hasBG" style={{ overflowX: 'hidden', minHeight: '100vh', padding: '2rem' }}>
        <div className="container py-5">
          <div className="row mb-5 text-center">
            <div className="col">
              <h2 className="fw-bold mb-3" style={{ color: 'black' }}>All Resources (Admin View)</h2>
              <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', color: 'black' }}>
                As an admin, you can view and manage all resources in the system.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {resources.map((res) => (
              <div key={res.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm border-0">
                  <div style={{ height: '160px', position: 'relative' }}>
                    <Image
                      src={res.image || '/images/default-resource.jpg'}
                      alt={res.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem',
                      }}
                    />
                  </div>
                  <div className="card-body bg-white text-dark">
                    <h5 className="card-title">{res.name}</h5>
                    <p className="card-text">
                      <small>
                        <b>Owner:</b>
                        {' '}
                        {res.owner}
                      </small>
                      <br />
                      <small>
                        <b>Type:</b>
                        {' '}
                        {res.type}
                      </small>
                      <br />
                      <small>
                        <b>Location:</b>
                        {' '}
                        {res.location}
                      </small>
                      <br />
                      <small>
                        <b>Campus:</b>
                        {' '}
                        {res.campus}
                      </small>
                    </p>
                  </div>
                  <div className="card-footer bg-secondary text-white text-center">
                    <small>
                      Posted:
                      {res.posted}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // John or other logged-in user view
  return (
    <main id="hasBG" style={{ overflowX: 'hidden', minHeight: '100vh', padding: '2rem' }}>
      <div className="container py-5">
        <div className="row mb-5 text-center">
          <div className="col">
            <h2 className="fw-bold mb-3" style={{ color: 'black' }}>How To Use The Scheduler</h2>
            <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', color: 'black' }}>
              Browse and reserve equipment through the Equipment tab, book study rooms via the Rooms tab,
              manage your current reservations in Your Resources, and get personalized recommendations
              using our LoanLink AI assistant.
            </p>
          </div>
        </div>

        <div className="row mb-4 text-center">
          <div className="col">
            <h2 className="fw-bold mb-3" style={{ color: 'black' }}>Recently Available Resources</h2>
            <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', color: 'black' }}>
              Browse a selection of the most recently posted rooms, equipment, and tools on campus.
              These resources are available now, and you can borrow them directly by clicking one of
              the options below or exploring further on our Borrow Equipment Tab.
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {resources.map((res) => (
            <div key={res.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div style={{ height: '160px', position: 'relative' }}>
                  <Image
                    src={res.image || '/images/default-resource.jpg'}
                    alt={res.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem',
                    }}
                  />
                </div>
                <div className="card-body bg-white text-dark">
                  <h5 className="card-title">{res.name}</h5>
                  <p className="card-text">
                    <small>
                      <b>Type:</b>
                      {' '}
                      {res.type}
                    </small>
                    <br />
                    <small>
                      <b>Location:</b>
                      {' '}
                      {res.location}
                    </small>
                    <br />
                    <small>
                      <b>Campus:</b>
                      {' '}
                      {res.campus}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-secondary text-white text-center">
                  <small>
                    Posted:
                    {res.posted}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
