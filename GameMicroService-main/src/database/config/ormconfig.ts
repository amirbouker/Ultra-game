export function ormConfig(): any {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', process.env.DATABASE_TYPE);
  return {
    type: process.env.DATABASE_TYPE || 'mongodb',
    host: process.env.DATABASE_HOST || 'nestmongo',
    port: parseInt(process.env.DATABASE_PORT || '27017'),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ULTRA',
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeout: parseInt(
      process.env.DATABASE_CONNECTION_TIME_OUT || '150000',
    ),
    acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT || '150000'),
    extra: {
      connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT || '20'),
    },
    entities: ['dist/**/*.entity.js'],
    cli: {
      entitiesDir: 'src/**/*.entity.ts',
    },
  };
}
