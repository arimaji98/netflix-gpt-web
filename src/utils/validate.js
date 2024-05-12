export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid && !isPasswordValid)
    return "Email Id and Password is not valid.";
  else if (!isEmailValid && isPasswordValid) return "Email Id is not valid.";
  else if (!isPasswordValid && isEmailValid) return "Password is not valid.";

  return null;
};

export const checkValidName = (name) => {
  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  if (!isNameValid) return "Name is not Valid";

  return null;
};
