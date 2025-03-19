import { getSkills } from './lib/skill';
import ProgLangToIconTab from './programmingLangToIconTab';

export default async function Page() {
  const [ skills ] = await Promise.all([ getSkills() ])

  return (
    <div className='wa-stack wa-gap-2xl"'>
      {
        skills ? <div className="wa-cluster">
          {
            skills.map((skill, i) => (
              <ProgLangToIconTab key={ `skill-${i}` } lang={ skill.name } title={ `${skill.name}: ${skill.proficiency}` } />
            ))
          }
        </div> : <div>failed to load languages</div>
      }
    </div>
  );
}