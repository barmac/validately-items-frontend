import * as React from 'react';

import './AddItem.css';

interface AddItemProps {
  onItemAdded: (name: string) => void;
}

interface AddItemState {
  name: string;
}

export class AddItem extends React.Component<AddItemProps, AddItemState> {
  constructor(props: AddItemProps) {
    super(props);
    this.state = {
      name: '',
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onItemAdded = this.onItemAdded.bind(this);
  }
  public render() {
    return (
      <div className='add-item'>
        <input value={this.state.name} onChange={this.onNameChange} />
        <button type='button' onClick={this.onItemAdded}>Add</button>
      </div>
    );
  }

  private onNameChange(event: any): void {
    this.setState({ name: event.target.value });
  }

  private onItemAdded(): void {
    this.props.onItemAdded(this.state.name);
  }
}
