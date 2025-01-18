export interface IHomePageMainButtonGroup {
  id: number;
  icon: string;
  title: string;
  description: string;
  arrowIcon: string;
}

export type IHomePageBottomButtonGroup = Pick<IHomePageMainButtonGroup, "id" | "icon"> & {
  title: string[];
};
