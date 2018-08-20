import * as React from 'react';

import Item from '../Item';
import './SingleItem.css';

interface SingleItemProps {
  item: Item;
  onVoteUp: (id: string) => void;
  onVoteDown: (id: string) => void;
}

interface SingleItemState {
  isEdited: boolean;
  name: string;
}

export class SingleItem extends React.Component<SingleItemProps, SingleItemState> {
  constructor(props: SingleItemProps) {
    super(props);
    this.setName = this.setName.bind(this);
    this.editName = this.editName.bind(this);
    this.onVoteUp = this.onVoteUp.bind(this);
    this.onVoteDown = this.onVoteDown.bind(this);
    this.state = {
      isEdited: false,
      name: this.props.item.name,
    };
  }

  public render() {
    return (
      <div className='single-item'>
        {
          this.state.isEdited ?
          <input onChange={this.setName} value={this.state.name} /> :
          <div onClick={this.editName}>
            {this.props.item.name}
          </div>
        }
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

  private setName(event: any): void {
    this.setState({ name: event.target.value });
  }

  private editName(): void {
    this.setState({ isEdited: true });
  }

  private onVoteUp(): void {
    this.props.onVoteUp(this.props.item._id);
  }

  private onVoteDown(): void {
    this.props.onVoteDown(this.props.item._id);
  }
}
