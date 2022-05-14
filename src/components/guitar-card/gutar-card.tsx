function GuitarCard (): JSX.Element {
    return (
        <div className="product-card"><img src="img/content/catalog-product-0.jpg" srcSet="img/content/catalog-product-0@2x.jpg 2x" width="75" height="190" alt="СURT Z30 Plus Acoustics">
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: Хорошо</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
          </div>
          <p className="product-card__title">СURT Z30 Plus Acoustics</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
          </p>
        </div>
        <div className="product-card__buttons"><a className="button button--mini" href="#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
        </div>
      </div>
    )
}

export default GuitarCard;
