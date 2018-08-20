import * as React from 'react';

import { backendUri } from '../config/config';
import AddItem from './AddItem';
import Item from './Item';
import './ItemsList.css';
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
    this.updateName = this.updateName.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  public render() {
    return (
      <div>
        <div className='items-list__list'>
          <div className='items-list__list__header'>
            <div>NAME</div>
            <div>RATING</div>
            <div>VOTE UP</div>
            <div>VOTE DOWN</div>
            <div>REMOVE</div>
          </div>
          {this.renderItems()}
        </div>
        <div className='items-list__form'>
          <AddItem onItemAdded={this.addItem} />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.fetchItems();
  }

  private fetchItems(): void {
    window.fetch(backendUri + '/items')
      .then((res: Response) => res.json())
      .then((items: Item[]) => this.setState({ items }))
      .catch(console.error);
  }

  private renderItems() {
    return this.state.items.map((item: Item, index: number) => <SingleItem key={index} item={item} updateName={this.updateName} onVoteUp={this.voteUp} onVoteDown={this.voteDown} onRemove={this.removeItem} />)
  }

  private addItem(name: string): void {
    if (!name) {
      return;
    }

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

  private updateName(itemId: string, name: string): void {
    const options: RequestInit  = {
      body: JSON.stringify({ name }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'PUT',
    };

    window.fetch(backendUri + '/items/' + itemId, options)
      .then((res: Response) => res.json())
      .then((updatedItem: Item) => this.setState((state: ItemsListState) => {
        const items: Item[] = state.items.map(
          (item: Item) => item._id === updatedItem._id ? { ...updatedItem } : item
        );
        return { ...state, items };
      }))
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

  private removeItem(itemId: string): void {
    const options: RequestInit  = {
      method: 'DELETE',
    };

    window.fetch(backendUri + '/items/' + itemId, options)
      .then(() => this.setState((state: ItemsListState) => {
        const items: Item[] = state.items.filter(
          (item: Item) => item._id !== itemId
        );
        return { ...state, items };
      }))
      .catch(console.error);
  }
}
