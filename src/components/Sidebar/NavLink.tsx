import {Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text} from "@chakra-ui/react";
import {IconType} from "react-icons/lib";
import {ActiveLink} from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  icon: IconType;
  href: string;
}

export function NavLink ({children, icon, href, ...rest}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display='flex' align='center' {...rest}>
        <Icon as={icon} fontSize='20'/>
        <Text ml='4' fontWeight='medium'>{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}