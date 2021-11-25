export const requestUsers = () => {
  return {
    type: "request",
  };
};

export const successUsers = (users) => {
  return {
    type: "success",
    payload: users,
  };
};

export const failUsers = (error) => {
  return {
    type: "fail",
    payload: error,
  };
};
