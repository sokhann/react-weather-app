import React from 'react';
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from '@material-ui/core';

export const Menu = ({ links = [] }: MenuProps) => {
  return (
    <List>
      {
        links.map((item, index) => {
          return (
            <Link key={index} to={item.link }>
              <ListItem button>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          );
        })
      }
    </List>
  );
}

export interface MenuLinkProps {
  title: string;
  link: string;
};

export interface MenuProps {
  links: MenuLinkProps[];
}