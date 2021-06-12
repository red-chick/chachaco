export const checkEmail = (email: string) => {
  var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (exptext.test(email) == false) {
    return false;
  }
  return true;
};
