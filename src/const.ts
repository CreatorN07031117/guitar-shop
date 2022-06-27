export const CARDS_PER_PAGE = 9;

export const enum AppRoute {
  Index = '/',
  Catalog = '/catalog',
  Guitar = '/guitars/:id',
  NotFound = '*'
}

export const RATING_STARS = 5;

export const enum  NameSpace {
  Catalog = 'CATALOG',
  Cart = 'CART',
  Product = 'PRODUCT'
}

export const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy/';

export const REQUEST_TIMEOUT = 5000;

export const enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/',
  Comments = '/comments',
  Search = '/guitars?name_like=',
}

export const enum HTTPCode {
  BadRequest = 400,
  NotFound = 404,
  BadGateway = 502,
}

export const enum GuitarType {
  Ukulele = 'Укулеле',
  Electric = 'Электрогитара',
  Acoustic = 'Акустическая',
}

export const COMMENTS_ON_PAGE = 3;

export const enum TextRating {
  Terrible = 'Ужасно',
  Poorly = 'Плохо',
  Fine = 'Нормально',
  Good = 'Хорошо',
  Great = 'Отлично',
}

export const enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export const enum OrderMethod {
  Desc = 'desc',
  Asc = 'asc',
}

export const enum SortParam {
  Sort = '_sort=',
  Order = '_order=',
}

export const enum FiltersParam {
  PriceGte = 'price_gte=',
  PriceLte = 'price_lte=',
  Acoustic = 'type=acoustic',
  Electric = 'type=electric',
  Ukulele = 'type=ukulele',
  FourStrings = 'stringCount=4',
  SixStrings = 'stringCount=6',
  SevenStrings = 'stringCount=7',
  TwelveStrings = 'stringCount=12',
}
