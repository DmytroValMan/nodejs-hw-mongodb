import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';

const parseSortOrder = (sortOrder) => {
  if (SORT_ORDER.ASC.includes(sortOrder)) return 'asc';
  if (SORT_ORDER.DESC.includes(sortOrder)) return 'desc';
  return 'asc';
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = Object.keys(ContactsCollection.schema.paths);
  if (keysOfContacts.includes(sortBy)) return sortBy;
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
