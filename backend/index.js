const app = require("express")();
app.use(require("express").json());
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
