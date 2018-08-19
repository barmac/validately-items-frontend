import * as React from 'react';

import { backendUri } from '../config/config';
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
  }

  public render() {
    return (
      <div>
        {this.renderItems()}
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
    return this.state.items.map((item: Item, index: number) => <SingleItem key={index} item={item} />)
  }
}
