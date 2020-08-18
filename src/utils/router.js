export const fnPrefix = (pathname) => {
  const url = pathname.split("/");
  return `/${url[1]}/${url[2]}`;
};
