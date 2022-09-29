import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ShopItem from './components/ShopItem';
import './styles/index.scss';

const App = () => {
  const [shopItems, setShopItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  interface InitialItem {
    productId: number;
    name: string;
    description: string;
    price: number;
    priceWas: number;
    available: string;
    quantity: number;
    lowOnStock: string;
    promotionBadge: string;
    imageUrl: string;
  }
  interface Item {
    productId: number;
    name: string;
    description: string;
    price: number;
    priceWas: number;
    available: boolean;
    quantity: number;
    lowOnStock: boolean;
    promotionBadge: string;
    imageUrl: string;
  }

  useEffect(() => {
    fetch('https://run.mocky.io/v3/fca7ef93-8d86-4574-9a4a-3900d91a283e')
      .then(response => response.json())
      .then(res => {
        const updateAvailableItems: Item[] = res.map((item: InitialItem) => ({
          ...item,
          available: item.available === 'TRUE' && item.quantity > 0 ? true : false,
          lowOnStock: item.lowOnStock === 'TRUE' ? true : false,
        }));
        setLoading(false);
        setShopItems(updateAvailableItems);
      })
      .catch(err => setError(err));
  }, []);

  const handleDeleteItem = () => {
    const deletedItems = shopItems.filter((item: Item) => !selectedItems.includes(item.productId));
    setShopItems(deletedItems);
  };

  const handleItemSelection = (id: number, checked: boolean) => {
    let allSelectedItems = [...selectedItems];

    if (checked) {
      allSelectedItems = [...selectedItems, id];
    } else {
      allSelectedItems.splice(selectedItems.indexOf(id), 1);
    }

    setSelectedItems(allSelectedItems);
  };

  if (loading) {
    return <Loader />;
  }
  console.log(shopItems)
  return (
    <div className='container'>
      <div className='container__header'>
        <button onClick={handleDeleteItem}>Remove selected products</button>
      </div>
      <div className='container__item-wrapper'>
        {shopItems.length > 0 ? (
          shopItems.map(
            (item: Item, index: number) =>
              item.available && (
                <ShopItem
                  key={item.productId}
                  item={item}
                  handleItemSelection={handleItemSelection}
                />
              )
          )
        ) : (
          <span>No Items</span>
        )}
      </div>
    </div>
  );
};

export default App;
