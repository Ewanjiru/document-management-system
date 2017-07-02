export default function authenticate(token) {
  console.log(token);
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const userDetails = JSON.parse(window.atob(base64));
  return userDetails;
}
