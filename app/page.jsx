import Link from 'next/link';

import NavBar from './components/NavBar';

export const metadata = {
  title: "Haruto Apps",
  description: "Haruto Apps main website",
};


export default function Home() {
  return (
    <>
      <NavBar />
      <main className="centerbox">
        <wa-card className="card-basic">
          <div style={ { fontSize: "var(--wa-font-size-4xl)" } }>Hi,</div>
          <div>
            Welcome, this website and it's framework I'm using is still in a testing phase.
            <br />
            Do look around, if you found any issues please let me know
          </div>
          <wa-divider></wa-divider>
          <div>
            If you are a recruiter please look at&nbsp;
            <Link href="/portfolio">
              my portfolio
            </Link>
            .<br />
            If you intend to call me please drop me a whatsapp/text first.
            <br />
            Due to the amount of spam calls nowadays I rarely pick up cold calls.
          </div>
        </wa-card>
      </main>
    </>
  );
}
