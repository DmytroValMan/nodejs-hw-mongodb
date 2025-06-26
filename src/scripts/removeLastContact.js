import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contactsArray = await readContacts();
    if (contactsArray.length === 0) {
      console.log('There are no contacts');
      return;
    }
    contactsArray.pop();
    await writeContacts(contactsArray);
  } catch (err) {
    console.log(err);
  }
};

removeLastContact();
