import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  try {
    const contactsArray = await readContacts();
    return contactsArray.length;
  } catch (err) {
    console.log(err);
  }
};

console.log(await countContacts());
