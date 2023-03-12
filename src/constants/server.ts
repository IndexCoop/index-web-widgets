export const IndexApiBaseUrl = 'https://api.indexcoop.com';

export function getIndexApiHeaders() {
  return {
    'X-INDEXCOOP-API-KEY': process.env.REACT_APP_INDEX_COOP_API ?? '',
  };
}
