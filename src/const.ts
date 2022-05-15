export const CARDS_PER_PAGE = 9;

export const enum AppRoute {
  Index = '/',
  Catalog = '/contacts',
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
  Coupons = '/coupons',
  Order = '/orderes'
}

export const enum HTTPCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound= 404,
}
