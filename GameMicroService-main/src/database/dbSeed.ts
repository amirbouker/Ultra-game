import { MongoClient, ObjectId } from 'mongodb';

async function main() {
  console.log('🚀  Server ready');

  const url = `mongodb://nestmongo:27017/`;

  const dbName = 'ULTRA';

  const client = new MongoClient(url, {
    retryWrites: true,
  });

  try {
    await client.connect();

    console.log('🌱  Database seeder is running');

    const db = await client.db(dbName);

    const games = [
      {
        _id: {
          $oid: '63973c570465bb7f5b88b7fc',
        },
        title: 'Elden Ring',
        price: 59.99,
        discounted: false,
        tags: ['RPG'],
        publisher: {
          $oid: '63971b8456886a839c297e91',
        },
        resleaseDate: '2022-07-25T00:00:00.000Z',
      },
      {
        _id: {
          $oid: '63977a4264f88ffbc1d55eb9',
        },
        title: 'World of Warcraft',
        price: 10.99,
        discounted: false,
        tags: ['MMORG'],
        publisher: {
          $oid: '639746f4af3b6e53bf9048e2',
        },
        resleaseDate: '2004-11-22T23:00:00.000Z',
      },
      {
        _id: {
          $oid: '611d1a4576bfea0042c043d4',
        },
        title: 'Diablo IV',
        price: 70,
        discounted: false,
        tags: ['RPG'],
        publisher: {
          $oid: '639746f4af3b6e53bf9048e2',
        },
        resleaseDate: '2022-12-10T00:00:00.000Z',
      },
    ];

    games.map(async (item) => {
      await db.collection('game').insertOne({
        _id: new ObjectId(item._id.$oid),
        title: item.title,
        price: item.price,
        discounted: item.discounted,
        tags: item.tags,
        publisher: new ObjectId(item.publisher.$oid),
        resleaseDate: item.resleaseDate,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      });
    });

    const publishers = [
      {
        _id: {
          $oid: '63971b8456886a839c297e91',
        },

        name: 'FromSoftware Inc.',
        siret: '82932541400037',
        phone: '+8115-641-7490',
      },
      {
        _id: {
          $oid: '639746f4af3b6e53bf9048e2',
        },
        name: 'Blizzard Entertainment',
        siret: '48995245700047',
        phone: '+800-592-5499',
      },
    ];
    publishers.map(async (item) => {
      await db.collection('publisher').insertOne({
        _id: new ObjectId(item._id.$oid),
        name: item.name,
        siret: +item.siret,
        phone: item.phone,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      });
    });
  } catch (err) {
    console.log('❌  Server error', err.stack);
  } finally {
    console.log('💤  Server off');
    //await client.close();
  }
}

main().catch((error) => console.log('❌  Server error', error.stack));
