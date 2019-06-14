export const getLoginStatus = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('userpass64')

  return !!username && !!password
}
