import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getContainerList } from "./actions";

export type Container = ReturnTypeWithoutPromise<typeof getContainerList>[0];
