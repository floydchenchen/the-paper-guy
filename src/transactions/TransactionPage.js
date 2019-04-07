import React, {Component} from 'react';
import TransactionItem from './TransactionItem';

class TransactionPage extends Component{

  item1 = {
    date: "03/17/2019",
    title: "Juul Labs",
    category: "Alcohol & Bars",
    price: -1841.28,
    itemId: 1
  };

  item2 = {
    date: "04/01/2019",
    title: "CVS",
    category: "Pharmacy",
    price: 21.05,
    itemId: 2
  };

  render() {
    return (
      <div>
        <TransactionItem
          {...this.item1}
          credit={this.item1.price < 0}
        />
        <TransactionItem
          {...this.item2}
          credit={this.item2.price < 0}
        />
      </div>
    );
  }
}

export default TransactionPage;