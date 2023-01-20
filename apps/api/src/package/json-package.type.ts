import { User } from "@app/user/user.entity";

export interface JSONPackage {
  dependencies: Dependencies[];
  devDependencies: Dependencies[];
}

export interface Dependencies {
  name: string;
  version: string;
}

export interface MyPackage {
  id: number;
  name: string;
  versions?: Version[];
  usedBy?: UsedBy[];
}
export interface Version {
  userId: number;
  value: string;
}

export interface UsedBy {
  user: User;
  version: string;
}
