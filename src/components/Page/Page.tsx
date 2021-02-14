import React from "react";

export function Page({ data }) {
  console.log("data:", data);
  const { name } = data;
  return <>{name}</>;
}
