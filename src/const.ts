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
  Sort = '/guitars?_sort',
  Order = '&_order',
}

export const enum HTTPCode {
  BadRequest = 400,
  NotFound= 404,
}

export const enum GuitarType {
  Ukulele = 'Укулеле',
  Electric = 'Электрогитара',
  Acoustic = 'Акустическая',
}

export const stringsAcoustic = ['6-strings', '7-strings', '12-strings'];
export const stringsElectric = ['4-strings', '6-strings', '7-strings'];
export const stringsUkulele = ['4-strings'];

export const COMMENTS_ON_PAGE = 3;

export const enum TextRating {
  Terrible = 'Ужасно',
  Poorly = 'Плохо',
  Fine = 'Нормально',
  Good = 'Хорошо',
  Great = 'Отлично',
}

export const enum Sort {
  Price = 'price',
  Rating = 'rating',
}

export const enum OrderMethod {
  Desc = 'desc',
  Asc = 'asc',
}
