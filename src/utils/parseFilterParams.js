import { ContactsCollection } from '../db/models/contact.js';

const parseEnum = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const enumValues = ContactsCollection.schema.path('contactType').enumValues;
  const isEnumValue = enumValues.includes(type);
  if (!isEnumValue) return;
  return type;
};

const parseBoolean = (booleanValue) => {
  const isString = typeof booleanValue === 'string';
  if (!isString) return;

  switch (booleanValue) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return;
  }
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedContactType = parseEnum(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
