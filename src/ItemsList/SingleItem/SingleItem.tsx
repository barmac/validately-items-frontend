import * as React from 'react';

import Item from '../Item';
import './SingleItem.css';

interface SingleItemProps {
  item: Item;
  onVoteUp: (id: string) => void;
  onVoteDown: (id: string) => void;
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
        <div>
          <i onClick={this.onVoteUp} className='fas fa-thumbs-up' />
        </div>
        <div>
          <i onClick={this.onVoteDown} className='fas fa-thumbs-down' />
        </div>
      </div>
    );
  }
  
  private onVoteUp(): void {
    this.props.onVoteUp(this.props.item._id);
  }

  private onVoteDown(): void {
    this.props.onVoteDown(this.props.item._id);
  }
}
