export interface JSONPackage {
  name: string;
  version: string;
  description: string;
  author: string;
  private: boolean;
  license: string;
  dependencies: Dependencies[];
  devDependencies: DevDependencies[];
}

export interface Dependencies {
  name: string;
  version: string;
}

export interface DevDependencies {
  name: string;
  version: string;
}
