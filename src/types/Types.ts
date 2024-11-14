export type StatusMissile = "idle" | "launched" | "intercepted" | "hit"

export type StatusStore = "idle" | "pending" | "fulfilled" | "rejected"

export type IArea = "North" | "South" | "Center" | "West Bank" | "terrorism"

export interface IMissile {
    map(arg0: (mis: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    name: string;
    amount: number;
    speed: number;
    intercepts: [string]
    price: number;
    status: StatusMissile,
    _id?: string;
  }

  export interface IOrganizations{
    name: string;
    resources: [{name:string, amount:number, _id?:string}];
    budget: number
    _id?: string;
  }

  export interface IResources {
    name: string;
    amount: number;
    _id?: string;
  }

  export interface IUser{
    name: string;
    password: string;
    organization?: string;
    nameOrg: string;
    area?: string;
    _id?: string;
  }