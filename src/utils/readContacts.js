import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, { encoding: 'utf-8' });
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    console.error(err);
    return [];
  }
};
