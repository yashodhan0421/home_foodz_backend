import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('lets start from here');
});

app.get("*", (req, res) => {
    res.json({status: "failed", message: "have you lost buddy"});
})


app.listen(port, (err?: any) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started on port ${port} ...`);
    }
})