import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.tag.upsert({
    where: { tagId: 1 },
    update: {},
    create: {
      title: 'nature',
      posts: {
        create: [
          {
            title: 'Полезный пост про Байкал',
            userId: '1111',
            content: 'Озеро Байкал – огромное древнее озеро в горах Сибири к северу от монгольской границы.',
            postType: 'Text',
            postState: 'Public',
            isRepost: false
          },
        ]
      },
    }
  });
  await prisma.tag.upsert({
    where: { tagId: 2 },
    update: {},
    create: {
      title: 'thoughts',
      posts: {
        create: [
          {
            userId: '2222',
            content: 'Тысячи людей живут без любви, но никто — без воды.',
            addInfo: 'Xью Оден',
            postType: 'Quote',
            postState: 'Public',
            isRepost: false
           },
          {
            userId: '3333',
            content: 'Себя надо любить и хвалить. Не поручать же такое ответственное дело чужим людям.',
            addInfo: 'Макс фрай',
            postType: 'Quote',
            postState: 'Public',
            isRepost: false,
            commentsCount: 1,
            comments: {
               create: [
                 {
                   message: 'Отличная цитата',
                   userId: '2222',
                 }
               ]
             }
          }
        ]
      },
    }
  });
  await prisma.tag.upsert({
    where: { tagId: 3 },
    update: {},
    create: {
      title: 'nature',
      posts: {
        create: [
          {
            title: 'Делюсь с вами ссылочкой',
            userId: '1111',
            content: 'https://vitadental.ru/',
            addInfo: 'Стоматология',
            postType: 'Link',
            postState: 'Public',
            isRepost: false,
            commentsCount: 2,
            comments: {
               create: [
                 {
                   message: 'Ужасная стоматология',
                   userId: '2222',
                 },
                 {
                  message: 'Не советую...',
                  userId: '3333',
                }
               ]
             }
          },
        ]
      },
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
