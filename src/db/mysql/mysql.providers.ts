import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '52.140.97.105',
        username: 'labs_team_user',
        password: 'KAAt0VtEQsOHUMFCAp4S',
        database: 'labs_framework',
      });
      console.log('Connecting to MySQL database...');
      const initalizer = dataSource.initialize();
      console.log('Connected to MySQL database');
      return initalizer;
    },
  },
];
