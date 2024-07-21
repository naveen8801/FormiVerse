import React from "react";

export default async function FormRenderer({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params?.id}</div>;
}
