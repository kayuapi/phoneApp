import { Twitt } from '../components/twitt';
import { NotificationTwitt } from '../components/notificationTwitt';

type TwittProps = React.ComponentProps<typeof Twitt>;

export const twitts: Omit<TwittProps, 'onPress'>[] = [
  {
    id: 1,
    name: '🌈 Josh',
    handle: '@JoshWComeau',
    date: '10h',
    content:
      '🔥 Automatically use "smart" directional curly quotes with the `quotes` CSS property! Even handles nested quotes with the <q> tag :o',
    image: 'https://pbs.twimg.com/media/EOUrCOcWAAA71rA?format=png&name=small',
    avatar:
      'https://pbs.twimg.com/profile_images/1242807739681845248/HeUb7BAt_400x400.jpg',
    comments: 12,
    retweets: 36,
    hearts: 175,
  },
  {
    id: 2,
    name: 'Satyajit Sahoo',
    handle: '@satya164',
    date: '20h',
    content:
      'Not sure if I should be proud or ashamed of this piece of art 😅\n\n#Typescript',
    image: 'https://pbs.twimg.com/media/EONH4KWX4AEV-JP?format=jpg&name=medium',
    avatar:
      'https://pbs.twimg.com/profile_images/1203032057875771393/x0nVAZPL_400x400.jpg',
    comments: 64,
    retweets: 87,
    hearts: 400,
  },
  {
    id: 3,
    name: 'Elvin',
    handle: '@elvin_not_11',
    date: '14h',
    content:
      'Hid the home indicator from the app so the device resembles an actual iPod even more. Thanks @flipeesposito for the suggestion!',
    image:
      'https://static.antyweb.pl/uploads/2014/09/IPod_classic_6G_80GB_packaging-2007-09-22-1420x670.jpg',
    avatar:
      'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
    comments: 23,
    retweets: 21,
    hearts: 300,
  },
  {
    id: 4,
    name: '🌈 Josh',
    handle: '@JoshWComeau',
    date: '10h',
    content:
      '🔥 Automatically use "smart" directional curly quotes with the `quotes` CSS property! Even handles nested quotes with the <q> tag :o',
    image: 'https://pbs.twimg.com/media/EOUrCOcWAAA71rA?format=png&name=small',
    avatar:
      'https://pbs.twimg.com/profile_images/1242807739681845248/HeUb7BAt_400x400.jpg',
    comments: 12,
    retweets: 36,
    hearts: 175,
  },
  {
    id: 5,
    name: 'Satyajit Sahoo',
    handle: '@satya164',
    date: '20h',
    content:
      'Not sure if I should be proud or ashamed of this piece of art 😅\n\n#Typescript',
    image: 'https://pbs.twimg.com/media/EONH4KWX4AEV-JP?format=jpg&name=medium',
    avatar:
      'https://pbs.twimg.com/profile_images/1203032057875771393/x0nVAZPL_400x400.jpg',
    comments: 64,
    retweets: 87,
    hearts: 400,
  },
  {
    id: 6,
    name: 'Elvin',
    handle: '@elvin_not_11',
    date: '14h',
    content:
      'Hid the home indicator from the app so the device resembles an actual iPod even more. Thanks @flipeesposito for the suggestion!',
    image:
      'https://static.antyweb.pl/uploads/2014/09/IPod_classic_6G_80GB_packaging-2007-09-22-1420x670.jpg',
    avatar:
      'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
    comments: 23,
    retweets: 21,
    hearts: 300,
  },
];

type NotificationTwittProps = React.ComponentProps<typeof NotificationTwitt>;

export const notificationTweets: Array<NotificationTwittProps> = [
  {
    id: 1,
    content:
      'In any case, the focus is not react navigation, but the possibility of writing your app once and running it on several different platforms.  Then you use the technology you want, for example for the interface, I choose @rn_paper',
    name: 'Leandro Fevre',
    people: [
      {
        name: 'Evan Bacon 🥓',
        image:
          'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
      },
      {
        name: 'Leandro Favre',
        image:
          'https://pbs.twimg.com/profile_images/1265688225076690945/JpshyTTJ_400x400.png',
      },
    ],
  },
  {
    id: 2,
    content: "It's finally somewhat bright on my way to work 🥳",
    name: 'Tomasz Łakomy',
    people: [
      {
        name: 'Wojteg1337',
        image:
          'https://pbs.twimg.com/profile_images/1164452902913675264/cn3bEqJp_400x400.jpg',
      },
    ],
  },
  {
    id: 3,
    content:
      'What they say during code review:\n\n"I see your point, but this is extra work - how about we create a ticket for it and get to it next sprint?"\n\nWhat they mean:\n\n"I literally don\'t give a single shit about it and this ticket will rot in the backlog for eternity"',
    name: 'Tomasz Łakomy',
    people: [
      {
        name: 'Nader Dabit',
        image:
          'https://pbs.twimg.com/profile_images/1268352530423205889/V6Nz7mIt_400x400.jpg',
      },
    ],
  },
  {
    id: 4,
    content:
      'In any case, the focus is not react navigation, but the possibility of writing your app once and running it on several different platforms.  Then you use the technology you want, for example for the interface, I choose @rn_paper',
    name: 'Leandro Fevre',
    people: [
      {
        name: 'Evan Bacon 🥓',
        image:
          'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
      },
      {
        name: 'Leandro Favre',
        image:
          'https://pbs.twimg.com/profile_images/1265688225076690945/JpshyTTJ_400x400.png',
      },
    ],
  },
  {
    id: 5,
    content: "It's finally somewhat bright on my way to work 🥳",
    name: 'Tomasz Łakomy',
    people: [
      {
        name: 'Wojteg1337',
        image:
          'https://pbs.twimg.com/profile_images/1164452902913675264/cn3bEqJp_400x400.jpg',
      },
    ],
  },
  {
    id: 6,
    content:
      'What they say during code review:\n\n"I see your point, but this is extra work - how about we create a ticket for it and get to it next sprint?"\n\nWhat they mean:\n\n"I literally don\'t give a single shit about it and this ticket will rot in the backlog for eternity"',
    name: 'Tomasz Łakomy',
    people: [
      {
        name: 'Nader Dabit',
        image:
          'https://pbs.twimg.com/profile_images/1268352530423205889/V6Nz7mIt_400x400.jpg',
      },
    ],
  },
];

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const BACON_IPSUM1 =   {
  id: 1,
  name: '🌈 Josh',
  handle: '@JoshWComeau',
  date: '10h',
  content:
    '🔥 Automatically use "smart" directional curly quotes with the `quotes` CSS property! Even handles nested quotes with the <q> tag :o',
  image: 'https://pbs.twimg.com/media/EOUrCOcWAAA71rA?format=png&name=small',
  avatar:
    'https://pbs.twimg.com/profile_images/1242807739681845248/HeUb7BAt_400x400.jpg',
  comments: 12,
  retweets: 36,
  hearts: 175,
};

const BACON_IPSUM2 = {
  id: 2,
  content: "It's finally somewhat bright on my way to work 🥳",
  name: 'Tomasz Łakomy',
  people: [
    {
      name: 'Wojteg1337',
      image:
        'https://pbs.twimg.com/profile_images/1164452902913675264/cn3bEqJp_400x400.jpg',
    },
  ],
};

export const orders = [
  {
    id: 1,
    createdAt: '2020-09-28T12:06:11.528Z',
    shopId: 'demo',
    orderId: '1601294817658aa',
    fulfillmentMethod: 'DINE_IN',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'postscript 1',
    orderedItems: [{
      id: '11',
      name: 'chicken',
      variant: 'small',
      quantity: 2,
    }, {
      id: '12',
      name: 'fish',
      variant: 'fried',
      quantity: 5,
    }],
    tableNumber: '123',
  },
  {
    id: 2,
    createdAt: '2020-09-28T12:12:28.095Z',
    shopId: 'demo',
    orderId: '1601294817658cs',
    fulfillmentMethod: 'DELIVERY',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'postscript2',
    orderedItems: [{
      id: '16',
      name: 'chicken',
      variant: 'small',
      quantity: 2,
    }],
    firstName: 'Zhi Cong',
    lastName: 'Tay',
    phoneNumber: '+60108001190',
    deliveryDate: '2020-09-28',
    deliveryTime: '12:16:40.823Z',
    deliveryAddress: '5, Jln Othman, Muar, Johor',
  },
  {
    id:3,
    createdAt: '2020-09-28T12:16:40.823Z',
    shopId: 'demo',
    orderId: '1601294817658ab',
    fulfillmentMethod: 'SELF_PICKUP',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'postscript2',
    orderedItems: [{
      id: '18',
      name: 'chicken',
      variant: 'small',
      quantity: 2,
    }],
    firstName: 'Abu',
    lastName: 'Jae',
    phoneNumber: '+60108001190',
    pickupDate: '2020-09-28',
    pickupTime: '12:16:40.823Z',
    vehiclePlateNumber: 'WG 1125',
  },
];