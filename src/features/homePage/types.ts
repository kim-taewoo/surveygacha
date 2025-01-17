export interface ICommonProps {
  id: number;
  icon: string;
}

export interface IHomePageMainButtonGroup extends ICommonProps {
  title: string;
  description: string;
  arrowIcon: string;
}

export interface IHomePageBottomButtonGroup extends ICommonProps {
  title: string[];
}
