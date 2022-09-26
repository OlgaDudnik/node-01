const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const getAll = await fs.readFile(contactsPath);
    return JSON.parse(getAll.toString());
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idContact = String(contactId);
  const result = contacts.find((item) => item.id === idContact);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idContact = String(contactId);
  const index = contacts.findIndex((item) => item.id === idContact);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
