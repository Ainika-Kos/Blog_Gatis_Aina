import React, { FC } from 'react';
import './bigCard.scss';

type BigCardProps = {
  title: string;
  body: string;
  author: string;
  clickHandler: () => void;
};

export const BigCard: FC<BigCardProps> = ({
  title,
  body,
  author,
  clickHandler
}) => {
  return (
    <div className="BigCard">
      <div>
        <img src="https://picsum.photos/300" alt={title} className="BigCard__image" />
      </div>
      <h3 className="BigCard__title">{title.toString().split(' ').splice(1, 3).join(' ')}</h3>
      <p className="BigCard__body">{body.toString().substring(0, 90).concat('...')}</p>
      <div className="BigCard__footer">
        <p className="BigCard__author">By: {author}</p>
        <button type="button" className="BigCard__button" onClick={clickHandler}>
          Read more
        </button>
      </div>
    </div>
  );
};