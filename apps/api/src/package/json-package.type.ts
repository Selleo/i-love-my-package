import { ReacrtionType } from "@app/rating/rating.dto";
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
  reactions?: {
    [key in ReacrtionType]: {
      email: string;
      comment: string;
    }[];
  };
}
export interface Version {
  userId: number;
  value: string;
}

export interface UsedBy {
  user: User;
  version: string;
}
