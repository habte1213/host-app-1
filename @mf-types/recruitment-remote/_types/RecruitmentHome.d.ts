import { JSX, ReactNode } from "react";
type NextPageWithLayout<P = object> = {
    (props: P): JSX.Element;
    getLayout?: (page: ReactNode) => ReactNode;
};
declare const RecruitmentHome: NextPageWithLayout;
export default RecruitmentHome;
