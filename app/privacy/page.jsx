export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Haruto Apps",
};

export default function PrivacyDefault() {
  return (
    <main className="centerbox">
      <wa-card with-header class="card-header">
        <h2 slot="header">Privacy Policy</h2>

        <h3>Personal use and not for public</h3>
        <h3>Run away if you ain't me!</h3>
        <p>
          No personal data other than oauth is saved locally. <br />
          This is only meant for personal use and not open to public.  <br />
          If you are here and you aren't Malcolm, please reject it.
        </p>
      </wa-card>
    </main>
  );
}