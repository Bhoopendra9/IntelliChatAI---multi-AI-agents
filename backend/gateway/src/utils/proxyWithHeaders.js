import proxy from "express-http-proxy";

const proxyWithHeaders = (targetUrl) => {
  return proxy(String(targetUrl), {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => ({
      ...proxyReqOpts,
      headers: {
        ...proxyReqOpts.headers,
        ["x-user-id"]: srcReq.user.userId || "",
        cookie: srcReq.headers.cookie || "",
      },
    }),
  });
};

export default proxyWithHeaders;
