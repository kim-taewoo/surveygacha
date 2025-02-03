export interface IHomePageMainButtonGroup {
  id: number;
  icon: string;
  title: string;
  description: string;
  arrowColor: string;
  href: string;
}

export type IHomePageBottomButtonGroup = Pick<IHomePageMainButtonGroup, "id" | "icon"> & {
  title: string[];
};
