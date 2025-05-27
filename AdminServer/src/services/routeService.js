import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesFile = path.join(__dirname, '../../data/routes.json');

// Helper to read routes from file
const getRoutesFromFile = async () => {
  try {
    const data = await fs.readFile(routesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, create it with empty array
    if (err.code === 'ENOENT') {
      await fs.writeFile(routesFile, JSON.stringify([]));
      return [];
    }
    throw err;
  }
};

// Helper to write routes to file
const writeRoutesToFile = async (routes) => {
  await fs.writeFile(routesFile, JSON.stringify(routes, null, 2));
};

// Get all routes
export const getAllRoutes = async () => {
  return await getRoutesFromFile();
};

// Get route by ID
export const getRouteById = async (id) => {
  const routes = await getRoutesFromFile();
  return routes.find(route => route.id === id) || null;
};

// Create new route
export const createRoute = async (routeData) => {
  const routes = await getRoutesFromFile();
  
  const newRoute = {
    id: uuidv4(),
    ...routeData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  routes.push(newRoute);
  await writeRoutesToFile(routes);
  
  return newRoute;
};

// Update route
export const updateRoute = async (id, routeData) => {
  const routes = await getRoutesFromFile();
  const index = routes.findIndex(route => route.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedRoute = {
    ...routes[index],
    ...routeData,
    updated_at: new Date().toISOString()
  };
  
  routes[index] = updatedRoute;
  await writeRoutesToFile(routes);
  
  return updatedRoute;
};

// Update route status
export const updateRouteStatus = async (id, active) => {
  const routes = await getRoutesFromFile();
  const index = routes.findIndex(route => route.id === id);
  
  if (index === -1) {
    return null;
  }
  
  routes[index].active = active;
  routes[index].updated_at = new Date().toISOString();
  
  await writeRoutesToFile(routes);
  
  return routes[index];
};

// Delete route
export const deleteRoute = async (id) => {
  const routes = await getRoutesFromFile();
  const filteredRoutes = routes.filter(route => route.id !== id);
  
  if (filteredRoutes.length === routes.length) {
    return false;
  }
  
  await writeRoutesToFile(filteredRoutes);
  
  return true;
};