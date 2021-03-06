import * as React from "react";

interface Props {
    style?: React.CSSProperties;
    children: React.ReactNode;
}
export const ScrollBox = (props: Props) => {
    const { children, style } = props;
    return (
        <div style={style} className="style-scroll-box">
            {children}
        </div>
    );
};
