"use client"
  const createQueryString = (name:any, value:any) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };
export default createQueryString;
