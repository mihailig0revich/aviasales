import { useState } from 'react';

import Card from '../Card/Card';
import { IFlightCard } from '../../types/types';
import MoreBtn from '../MoreBtn/MoreBtn';
import Error from '../Error/Error';

import styles from './cardList.module.scss';

interface ICardList {
  flight: IFlightCard[];
  error: boolean;
  errorText: string;
}

function CardList({ flight, error, errorText }: ICardList) {
  const [count, setCount] = useState(5);
  const allTicketsVisible = count >= flight.length;
  const handleClick = () => {
    setCount(count + 5);
  };

  if (error) {
    return <Error errorText={errorText} />;
  }

  if (!flight.length) {
    return (
      <div className={styles.container}>
        <p>Подходящих билетов не найдено</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {flight.slice(0, count).map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Card key={index} info={item} />;
      })}
      {allTicketsVisible ? '' : <MoreBtn handleClick={handleClick} />}
    </div>
  );
}

export default CardList;
