export default {
  server: process.env.MAIL_SERVER || 'gmail',
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  user: process.env.MAIL_USER || 'yashodhankalia0@gmail.com',
  pass: process.env.MAIL_PASS || 'HaCk@14321',
  port: process.env.MAIL_PORT || 465,
  ssl: true
};
