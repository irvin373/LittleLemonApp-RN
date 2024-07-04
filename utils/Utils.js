export function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
  .catch((error) => {
    console.error(error);
  });
}

export const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};