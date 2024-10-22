import React from "react";
import ContainerGrid from "./_components/container-grid";
import { getContainerList } from "./actions";

export default async function Page() {
  const containerList = await getContainerList();
  return <ContainerGrid containerList={containerList} />;
}
