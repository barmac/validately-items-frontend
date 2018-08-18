import * as React from 'react';

import { backendUri } from '../config/config';
import Item from './Item';

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
  }

  public render() {
    return (
      <div>
        {!this.state.items ? null : this.state.items.map((item: Item, index: number) => <div key={index}>{item.name} {item.rating}</div>)}
      </div>
    )
  }

  public componentDidMount() {
    window.fetch(backendUri + '/items')
    .then((res: Response) => res.json())
    .then((items: Item[]) => this.setState({ items }))
    // tslint:disable-next-line:no-console
    .catch(console.error);
  }
}
