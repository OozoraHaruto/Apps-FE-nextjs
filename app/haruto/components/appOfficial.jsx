import AppCard from './appCard';
import { getAppsOfficial } from './lib/apps';


export default async function Page() {
  const [ apps ] = await Promise.all([ getAppsOfficial() ])

  return (
    <div className="wa-grid" style={ { "--min-column-size": "333px" } }>
      {
        apps ? <>
          { apps.map((app, i) => <AppCard key={ `app-${i}` } ownKey={ `app-${i}` } app={ app } />) }
        </> : <tr><td colSpan={ 2 }>No Mac keys Found</td></tr>
      }
    </div>
  );
}