'use strict'

export interface AuthorIterator {
  hasNext: () => boolean;
  next: () => Object;
}
