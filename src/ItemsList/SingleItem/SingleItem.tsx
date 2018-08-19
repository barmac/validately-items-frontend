import * as React from 'react';

import Item from '../Item';
import './SingleItem.css';

interface SingleItemProps {
  item: Item;
}

export class SingleItem extends React.Component<SingleItemProps, any> {
  public render() {
    return (
      <div className='single-item'>
        <div>
          {this.props.item.name}
        </div>
        <div>
          {this.props.item.rating}
        </div>
      </div>
    );
  }
}
