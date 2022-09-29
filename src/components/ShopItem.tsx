import React from 'react';
import { ShopItemType } from '../types/ShopItem.types';
import '../styles/index.scss';

interface Props {
  item: ShopItemType;
  handleItemSelection: (id: number, checked: boolean) => void;
}

const ShopItem: React.FC<Props> = ({ item,  handleItemSelection}) => {
  return (
    <div className='item'>
      <div className='item__header'>
        <input
          type='checkbox'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleItemSelection(item.productId, e.target.checked)
          }
        />
        <img src={item.imageUrl} />
        {item.promotionBadge && (
          <div className='item__header__promotion'>
            <span>{item.promotionBadge}</span>
          </div>
        )}
      </div>
      <div className='item__body'>
        <span>{item.name}</span>
        <div className='item__body__price'>
          <span>&#163;{item.price}</span>
          <span>&#163;{item.priceWas}</span>
        </div>
        <div className='item__body__stock'>
          <span>{item.quantity ? `${item.quantity} in stock` : 'OUT OF STOCK'}</span>
          {item.lowOnStock && <p>LOW ON STOCK</p>}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
