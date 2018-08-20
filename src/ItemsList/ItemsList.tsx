import * as React from 'react';

import { backendUri } from '../config/config';
import AddItem from './AddItem';
import Item from './Item';
import SingleItem from './SingleItem';

interface ItemsListState {
  items: Item[];
}

const defaultState: ItemsListState = {
  items: [],
};

export default class ItemsList extends React.Component<any, ItemsListState> {
  constructor(props: any) {
    super(props);
    this.state = defaultState;
    this.renderItems = this.renderItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  public render() {
    return (
      <div>
        {this.renderItems()}
        <AddItem onItemAdded={this.addItem} />
      </div>
    );
  }

  public componentDidMount() {
    window.fetch(backendUri + '/items')
      .then((res: Response) => res.json())
      .then((items: Item[]) => this.setState({ items }))
      .catch(console.error);
  }

  private renderItems() {
    return this.state.items.map((item: Item, index: number) => <SingleItem key={index} item={item} onVoteUp={this.voteUp} onVoteDown={this.voteDown} />)
  }

  private addItem(name: string): void {
    const options: RequestInit  = {
      body: JSON.stringify({ name }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
    };

    window.fetch(backendUri + '/items', options)
      .then((res: Response) => res.json())
      .then((item: Item) => this.setState({ items: [...this.state.items, item] }))
      .catch(console.error);
  }

  private voteUp(itemId: string): void {
    const options: RequestInit  = {
      method: 'POST',
    };

    window.fetch(backendUri + '/items/' + itemId + '/vote-up', options)
      .then((res: Response) => res.json())
      .then((updatedItem: Item) => this.setState((state: ItemsListState) => {
        const items: Item[] = state.items.map(
          (item: Item) => item._id === updatedItem._id ? { ...updatedItem } : item
        );
        return { ...state, items };
      }))
      .catch(console.error);
  }

  private voteDown(itemId: string): void {
    const options: RequestInit  = {
      method: 'POST',
    };

    window.fetch(backendUri + '/items/' + itemId + '/vote-down', options)
      .then((res: Response) => res.json())
      .then((updatedItem: Item) => this.setState((state: ItemsListState) => {
        const items: Item[] = state.items.map(
          (item: Item) => item._id === updatedItem._id ? { ...updatedItem } : item
        );
        return { ...state, items };
      }))
      .catch(console.error);
  }
}
