import NavBar from './components/NavBar';

export const metadata = {
  title: "Haruto Apps",
  description: "Haruto Apps main website",
};


export default function Home() {
  return (
    <>
      <NavBar/>
      <main className="centerbox">
        <wa-card className="card-basic">
          <div className="wa-frame">
            <div style={ { fontSize: "var(--wa-font-size-4xl)" }}>Hi,</div>
            <p>
              Welcome, this website is still in a testing phase.
            </p>
          </div>
        </wa-card>
      </main>
    </>

  );
}
