module.exports.dropRoom = 
`Drop table if exists rooms;`

module.exports.dropRec = 
`Drop table if exists recommendations`

module.exports.roomSchema = 
`Create table if not exists rooms (
  id Integer(50) not null primary key,
  name varchar(255)
  );`

module.exports.recSchema = 
`create table if not exists recommendations (
  id integer not null primary key,
  recImg varchar(255),
  recDetails varchar(255),
  recTitle varchar(255),
  recCost varchar(255),
  recRating varchar(255),
  recratingCount varchar(255),
  roomId integer(50)
);`
