import { getProductKeys } from './lib/productKeys';

const TableWrapper = ({ title, children }) => (
  <table className="wa-zebra-rows">
    <caption>{ title }</caption>
    <thead>
      <tr>
        <th>Item name</th>
        <th>Product keys</th>
      </tr>
    </thead>
    { children }
  </table>
)

export default async function Page() {
  const [ keys ] = await Promise.all([ getProductKeys() ])
  const [ windows, mac ] = keys

  return (
    <>
      <TableWrapper title="マック">
        <tbody>
          {
            mac ? <>
              {
                mac.map((key, i) => (
                  <tr key={ `mac-key-${i}` }>
                    <th>{ key.item }</th>
                    <td>{ key.productKey }</td>
                  </tr>
                ))
              }
            </> : <tr><td colSpan={ 2 }>No Mac keys Found</td></tr>
          }
        </tbody>
      </TableWrapper>
      <TableWrapper title="ウインドーズ">
        <tbody>
          {
            windows ? <>
              {
                windows.map((key, i) => (
                  <tr key={ `windows-key-${i}` }>
                    <th>{ key.item }</th>
                    <td>{ key.productKey }</td>
                  </tr>
                ))
              }
            </> : <tr><td colSpan={ 2 }>No Mac keys Found</td></tr>
          }
        </tbody>
      </TableWrapper>
    </>
  );
}