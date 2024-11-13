export type StatusMissile = "idle" | "launched" | "intercepted" | "hit"

export type StatusStore = "idle" | "pending" | "fulfilled" | "rejected"

export type IArea = "North" | "South" | "Center" | "West Bank" | "terrorism"

export interface IMissile {
    name: string;
    amount: Number;
    speed: Number;
    intercepts: [string]
    price: Number;
    status: StatusMissile,
    _id?: string;
  }

  export interface IOrganizations{
    name: string;
    resources: [string];
    budget: number
    _id?: string;
  }

  export interface IResources {
    name: string;
    amount: Number;
    _id?: string;
  }

  export interface IUser{
    name: string;
    password: string;
    organization?: string;
    area?: string;
    _id?: string;
  }