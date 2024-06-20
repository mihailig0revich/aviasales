import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { intlFormat, minutesToHours, minutesToMilliseconds } from 'date-fns';

import { IFlightCard, ITrip } from '../../types/types';

import styles from './card.module.scss';

interface ICard {
  info: IFlightCard;
}
function Card({ info }: ICard) {
  const stops = ['НЕТ ПЕРЕСАДОК', '1 ПЕРЕСАДКА', '2 ПЕРЕСАДКИ', '3 ПЕРЕСАДКИ'];
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <p className={styles.header__price}>{new Intl.NumberFormat('ru-RU').format(info.price)} P</p>
        <img alt="sdf" className={styles.header__logo} src={`https://pics.avs.io/99/36/${info.carrier}.png`} />
      </header>
      <section className={styles.info}>
        {info.segments.map((item: ITrip) => {
          const startDate = new Date(item.date).getTime() - 10800000;
          const endDate = startDate + minutesToMilliseconds(item.duration) - 10800000;
          const time = `${intlFormat(new Date(startDate), { hour: 'numeric', minute: 'numeric' })}-${intlFormat(new Date(endDate), { hour: 'numeric', minute: 'numeric' })}`;
          return (
            <React.Fragment key={item.date}>
              <div>
                <p className={styles.info__title}>{`${item.origin}-${item.destination}`}</p>
                <p className={styles.info__value}>{time}</p>
              </div>
              <div>
                <p className={styles.info__title}>В ПУТИ</p>
                <p className={styles.info__value}>{`${minutesToHours(item.duration)}ч ${item.duration % 60}м`}</p>
              </div>
              <div>
                <p className={styles.info__title}>{stops[item.stops.length]}</p>
                <p className={styles.info__value}>{item.stops.join(', ')}</p>
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
}

export default Card;
