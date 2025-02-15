import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        username: 'mysqluser',
        password: 'mysqlpw',
        database: 'inventory',
      });
      console.log('Connecting to MySQL database...');
      const initalizer = dataSource.initialize();
      console.log('Connected to MySQL database');
      return initalizer;
    },
  },
];
