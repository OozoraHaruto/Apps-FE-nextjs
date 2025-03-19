export default function Page({ icon, title }) {
  return (
    <div className='wa-flank'>
      <h2><wa-icon name={ icon }></wa-icon></h2>
      <h2>{ title }</h2>
    </div>
  );
}