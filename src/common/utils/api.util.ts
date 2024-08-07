export const isSuccessResponse = (state: any): boolean => {
  if (state) {
    const { isLoading, error, response } = state;
    if (error || (response && response.status !== 200) || isLoading)
      return false;

    return true;
  }

  return false;
};
