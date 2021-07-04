import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { Card, ListItemSecondaryAction, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'

import { CityProps } from '../../stores/cityStore'

interface CityFavoritesProps {
  items: CityProps[],
  onDelete: (id: number) => void
}

export const CityFavorites: FC<CityFavoritesProps> = ({ items, onDelete }) => {

  return <Card>
    <List>
      {
        items.map(item => {
          return <ListItem key={item.id}>
            <Link to={`/city/${item.id}`}>
              <ListItemText primary={item.name} />
            </Link>
            <ListItemSecondaryAction onClick={() => onDelete(item.id)}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        })
      }
    </List>
  </Card>
}