import React from "react";
import { Link } from "react-router-dom";
import { MenuLinkContainer } from "./MenuLinkStyles";

interface MenuLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
  children: JSX.Element | JSX.Element[] | string | string[];
}
const MenuLink = (props: MenuLinkProps) => {
  const { to, children, ...rest } = props;
  return (
    <MenuLinkContainer>
      <Link to={to} {...rest}>
        {children}
      </Link>
    </MenuLinkContainer>
  );
};
export default MenuLink;
