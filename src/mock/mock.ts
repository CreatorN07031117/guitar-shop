import {name, internet, datatype} from 'faker';
import {Guitar, Guitars, Comment, Comments} from '../types/data-types';

export const makeMockGuitar = (): Guitar => ({
  id: 1,
  name: 'Название гитары',
  vendorCode: datatype.string(10),
  type: 'electric',
  description: 'Описание гитары',
  previewImg: internet.avatar(),
  stringCount: 7,
  rating: 1,
  price:  datatype.number(5),
});


export const makeMockGuitars = (): Guitars => ([makeMockGuitar()]);

export const makeMockComment = (): Comment => ({
  id: '1',
  userName: 'Имя комментаратора',
  advantage: name.title(),
  disadvantage: name.title(),
  comment: 'Текст комментария',
  rating: 2,
  createAt: datatype.datetime(),
  guitarId: 1,
});

export const makeMockComments = (): Comments => ([makeMockComment()]);
