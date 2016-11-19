import express from 'express';

const router = express.Router();

const mockedVotes = [
  {
    id: 1,
    title: 'Vote 1',
    candidates: [
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
    ],
  },
  {
    id: 2,
    title: 'Vote 2',
    candidates: [
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
      {
        name: 'test-1',
        url: 'http://cp91279.biography.com/BRAND_BIO_Bio-Shorts_Bruce-Lee-Mini-Biography_0_172230_SF_HD_768x432-16x9.jpg',
        text: `I'm counting on a memory to get me out of here
               I'm waiting for the fog around this spooky little town to clear
               All this time I've spent being someone else's friend
               Just one more time for old time's sake I'd like to go back home again`,
      },
    ],
  },
];

router.get('/vote', (req, res, next) => {
  res.status(200);
  res.send(mockedVotes);
});

router.post('/vote/:id', (req, res, next) => {
  res.status(200);
  console.log(req.body);
  res.send(req.body);
});

router.put('/vote', (req, res, next) => {
  res.status(201);
  console.log(req.body);
  res.send(req.body);
});

export default router;
