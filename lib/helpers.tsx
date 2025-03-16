export const getSearchParams = (key: string) => {
  const params = new URLSearchParams(document.location.search);
  return params.get(key);
}