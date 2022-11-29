const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  }
  return {};
}
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));;
}

const logout = () => {
  localStorage.removeItem("user");
}

export{
  authHeader,
  getCurrentUser,
  logout
}