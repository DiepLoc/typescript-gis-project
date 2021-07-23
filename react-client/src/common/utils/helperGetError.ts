const helperGetError = (error: any) => {
  const message =
    error?.message ??
    error?.errors?.[Object.keys(error?.errors)[0]][0] ??
    "There is a problem connecting to the server, try again";
  return message;
};

export default helperGetError;
