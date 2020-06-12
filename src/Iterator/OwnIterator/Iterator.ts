'use strict';

export default interface AuthorIterator {
  hasNext: () => boolean;
  next: () => Object;
}
