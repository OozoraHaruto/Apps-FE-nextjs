import style from './loading.module.css'

export default async function LoadingProfile() {
  return (
    <>
      <main className="justifyCenter">
        <div className='wa-stack  wa-align-items-center wa-gap-2xl'>
          <div>
            <wa-skeleton id={ style.profileViewUserAvatarSkeleton } effect="sheen"></wa-skeleton>
          </div>
          <div>
            <h2><wa-skeleton effect="sheen"></wa-skeleton></h2>
          </div>
          <div>
            <wa-card with-header with-footer class="card-header card-footer">
              <div slot="header">
                <wa-skeleton effect="sheen"></wa-skeleton>
              </div>

              <wa-skeleton effect="sheen"></wa-skeleton>

              <div slot="footer">
                <wa-skeleton effect="sheen"></wa-skeleton>
              </div>
            </wa-card>
          </div>
        </div>
      </main>
    </>
  );
}