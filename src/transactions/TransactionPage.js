import React, {Component} from 'react';
import TransactionItem from './TransactionItem';
import firebase from '../Firebase';

class TransactionPage extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore().collection("react");
    this.state = {
      currentItems: []
    };
  }

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

  onCollectionUpdate = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const {amount, category, date, spent, timeStamp, title} = doc.data();
      this.setState((prevState) => ({
        currentItems: [...prevState.currentItems, {
          key: doc.id,
          price: amount,
          category,
          date,
          spent,
          timeStamp,
          title,
        }]
      }))
    });
  };

  componentDidMount() {
    // this.db.onSnapshot(this.onCollectionUpdate);
    this.db.orderBy("timeStamp").limit(10).onSnapshot(this.onCollectionUpdate);
  }

  render() {
    let items = this.state.currentItems.map((item) =>
      <TransactionItem
        key={item.key}
        date={item.date}
        title={item.title}
        category={item.category}
        price={item.price}
        credit={item.spent}
      />
    );

    return (
      <div>
        {this.state.currentItems.length < 1 ? <div>Loading</div> : items}
      </div>
    );
  }
}

export default TransactionPage;