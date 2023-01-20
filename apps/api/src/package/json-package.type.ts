export interface MyPackage {
  id: number;
  name: string;
  versions: string[];
}

export interface JSONPackage {
  dependencies: Dependencies[];
  devDependencies: Dependencies[];
}

export interface Dependencies {
  name: string;
  version: string;
}
