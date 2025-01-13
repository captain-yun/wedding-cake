import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

export const jsonDb = {
  async readFile(filename) {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  },

  async writeFile(filename, data) {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  },

  async findMany(filename, collection) {
    const data = await this.readFile(filename);
    return data[collection] || [];
  },

  async findOne(filename, collection, conditions) {
    const data = await this.readFile(filename);
    return data[collection]?.find(item => 
      Object.entries(conditions).every(([key, value]) => item[key] === value)
    );
  },

  async create(filename, collection, newData) {
    const data = await this.readFile(filename);
    const id = String(data[collection].length + 1);
    const timestamp = new Date().toISOString();
    
    const item = {
      id,
      ...newData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    data[collection].push(item);
    await this.writeFile(filename, data);
    return item;
  },

  async update(filename, collection, id, updateData) {
    const data = await this.readFile(filename);
    const index = data[collection].findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    data[collection][index] = {
      ...data[collection][index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await this.writeFile(filename, data);
    return data[collection][index];
  }
};
