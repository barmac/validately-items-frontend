import * as React from 'react';

import Item from '../Item';
import './SingleItem.css';

interface SingleItemProps {
  item: Item;
  updateName: (id: string, name: string) => void;
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
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
        <div>
        {
          this.state.isEdited ?
          <input onBlur={this.handleBlur} onKeyPress={this.handleKeyPress} onChange={this.setName} value={this.state.name} /> :
          <div onClick={this.editName}>
            {this.props.item.name}
          </div>
        }
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

  private handleBlur(): void {
    this.setState({ isEdited: false });
  }

  private handleKeyPress(event: any): void {
    if (event.key === 'Enter' && this.state.name) {
      this.props.updateName(this.props.item._id, this.state.name);
      this.setState({ isEdited: false });
    }
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
