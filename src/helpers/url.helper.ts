// form /url-path/ to url-path
export const formatUrl = (url: string) => url.replace(/^\/+|\/+$/g, "");
