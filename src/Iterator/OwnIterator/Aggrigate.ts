'use strict';

import AuthorIterator from './Iterator';

export default interface AuthorList{
  createIterator: () => AuthorIterator;
}
