import fs from 'node:fs/promises';

import { PATH_DB } from '../constants/contacts.js';

export const writeContacts = async (updatedContacts) => {
  try {
    const stringifiedUpdatedContacts = JSON.stringify(updatedContacts, null, 2);
    await fs.writeFile(PATH_DB, stringifiedUpdatedContacts);
  } catch (err) {
    console.log(err);
  }
};
