import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  const generatedContacts = [];
  for (let i = 0; i < number; i++) {
    const newContact = createFakeContact();
    generatedContacts.push(newContact);
  }

  try {
    const currentContacts = await readContacts();
    const mergedContacts = [...currentContacts, ...generatedContacts];
    await writeContacts(mergedContacts);
  } catch (err) {
    console.error(err);
  }
};

generateContacts(4);
