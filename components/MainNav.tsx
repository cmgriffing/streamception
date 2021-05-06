import tw from "twin.macro";
import styled from "styled-components";
import { colors } from "../util/colors";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { useRouter } from "next/router";
import { Children } from "react";
import React from "react";

const NavList = styled.ul`
  ${tw`flex flex-row list-none p-0`}
`;

const CustomLink = ({ href, children, ...props }) => {
  const { asPath } = useRouter();
  let { activeClassName, as } = props;
  if (!activeClassName) {
    activeClassName = "active";
  }
  let child: any;
  if (typeof children === "string") {
    child = <>{children}</>;
  } else {
    child = Children.only(children);
  }
  const childClassName = child.props.className || "";

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === href || asPath === as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;
  return (
    <Link href={href} {...props} passHref>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

const NavLink = styled.a`
  ${tw`px-4 border-b-4 border-solid`}
  border-color: transparent;
  &.active {
    ${tw`border-b-4 border-solid`}

    border-color: ${colors.text};
  }
`;

function MainNav() {
  const [token] = useToken();
  return (
    <nav>
      <NavList>
        {!token && (
          <li>
            <Link href="/login">Login/Signup</Link>
          </li>
        )}
        {token && (
          <>
            <li>
              <CustomLink href="/dashboard/host">
                <NavLink>Host</NavLink>
              </CustomLink>
            </li>
            <li>
              <CustomLink href="/dashboard/guest">
                <NavLink>Guest</NavLink>
              </CustomLink>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
