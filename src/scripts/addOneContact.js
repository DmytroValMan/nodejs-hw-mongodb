import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  const newContact = createFakeContact();
  try {
    const currentContacts = await readContacts();
    currentContacts.push(newContact);
    await writeContacts(currentContacts);
  } catch (err) {
    console.log(err);
  }
};

addOneContact();
