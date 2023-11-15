export const handleOptionCommon = (listItem = []) => {
  const options = listItem?.map((item: { id: string; name: string }) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });
  return options;
};

export const handleCategoryOptions = (listCategories = []) => {
  const options = handleOptionCommon(listCategories);
  return options;
};