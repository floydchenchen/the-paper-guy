import React, {Component} from 'react';
import TransactionItem from './TransactionItem';
import firebase from '../Firebase';

class TransactionPage extends Component {

  // MDm3dYqgf2QAj9ngAkRn
  constructor(props) {
    super(props);
    this.db = firebase.firestore().collection("react");
    this.state = {
      currentItems: [],
      referenceToOldestKey: "",
      loadingMore: false,
      currentCursor: -1,
      callingOnScoll: false
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const {amount, category, date, spent, timeStamp, title, timeStampKey} = doc.data();
      this.setState((prevState) => ({
        currentItems: [...prevState.currentItems, {
          key: doc.id,
          price: amount,
          category,
          date,
          spent,
          timeStamp,
          timeStampKey,
          title,
        }],
        referenceToOldestKey: timeStampKey,
        currentCursor: prevState.currentCursor += 1
      }), () => {
        console.log(timeStampKey);
      })
    });
    this.setState({loadingMore: false, callingOnScoll: false});
  };

  componentDidMount() {
    window.onscroll = () => {
      console.log(window.innerHeight + document.documentElement.scrollTop + " : " + document.documentElement.offsetHeight);
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        console.log('bottom');
        if (!this.state.callingOnScoll) {
          console.log('called');
          this.setState({loadingMore: true, callingOnScoll: true});
          this.db.orderBy("timeStampKey", "desc").startAfter(this.state.referenceToOldestKey).limit(20)
            .onSnapshot(this.onCollectionUpdate);
        }
      }
    };
    if (!this.state.referenceToOldestKey) {
      this.db.orderBy("timeStampKey", "desc").limit(50).onSnapshot(this.onCollectionUpdate);
    }
  }

  render() {
    let items = this.state.currentItems.map((item) =>
      <TransactionItem
        key={item.key}
        date={item.date}
        title={item.title}
        category={item.category}
        price={item.price}
        itemId={item.key}
        credit={item.spent}
      />
    );

    let moreItems = () => {
      if (this.state.currentCursor >= 15) {
        const itemsFromSixteen = this.state.currentItems.splice(15);
        return itemsFromSixteen.map((item) =>
          <TransactionItem
            key={item.key}
            date={item.date}
            title={item.title}
            category={item.category}
            price={item.price}
            itemId={item.key}
            credit={item.spent}
          />
        );
      }
      return null;
    };

    return (
      <div>
        {this.state.currentItems.length < 1 ? <div>Loading</div> : items}
        {this.state.loadingMore ? <div>Loading</div> : moreItems}
      </div>
    );
  }
}

export default TransactionPage;