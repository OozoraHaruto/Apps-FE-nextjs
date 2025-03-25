import { WAStyleGrid } from '@/app/components/webawesome';
import AppCard from './appCard';
import { getApps } from './lib/apps';


export default async function Page() {
  const [ apps ] = await Promise.all([ getApps() ])

  return (
    <WAStyleGrid minColumnSize="333px">
      {
        apps ? <>
          { apps.map((app, i) => <AppCard key={ `app-${i}` } ownKey={ `app-${i}` } app={ app } />) }
        </> : <tr><td colSpan={ 2 }>No Mac keys Found</td></tr>
      }
    </WAStyleGrid>
  );
}