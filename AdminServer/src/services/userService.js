import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFile = path.join(__dirname, '../../data/users.json');

// Helper to read users from file
const getUsersFromFile = async () => {
  try {
    const data = await fs.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, create it with empty array
    if (err.code === 'ENOENT') {
      await fs.writeFile(usersFile, JSON.stringify([]));
      return [];
    }
    throw err;
  }
};

// Helper to write users to file
const writeUsersToFile = async (users) => {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

// Get all users
export const getAllUsers = async () => {
  return await getUsersFromFile();
};

// Get user by ID
export const getUserById = async (id) => {
  const users = await getUsersFromFile();
  return users.find(user => user.id === id) || null;
};

// Get user by email
export const getUserByEmail = async (email) => {
  const users = await getUsersFromFile();
  return users.find(user => user.email === email) || null;
};

// Create new user
export const createUser = async (userData) => {
  const users = await getUsersFromFile();
  
  const newUser = {
    id: uuidv4(),
    ...userData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  users.push(newUser);
  await writeUsersToFile(users);
  
  return newUser;
};

// Update user
export const updateUser = async (id, userData) => {
  const users = await getUsersFromFile();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedUser = {
    ...users[index],
    ...userData,
    updated_at: new Date().toISOString()
  };
  
  users[index] = updatedUser;
  await writeUsersToFile(users);
  
  return updatedUser;
};

// Delete user
export const deleteUser = async (id) => {
  const users = await getUsersFromFile();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) {
    return false;
  }
  
  await writeUsersToFile(filteredUsers);
  
  return true;
};