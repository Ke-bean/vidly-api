const express = require("express");
const app= express();
const Joi = require("joi")
app.use(express.json())
const genres  = [
    {
        id: 1,
        name: "horror"
    }
]
app.get("/api/genres", (req, res)=>{
    res.json(genres)
})
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});
app.delete("/api/genres/:id", (req, res)=>{
    const genre = genres.find(gen=> gen.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre doesn't exist")
    let index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})
app.put("/api/genres/:id", (req, res)=>{
    let genre = genres.find(gen=> gen.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre doesn't exist");
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre);
})
app.get('/api/genres/:id', (req, res)=>{
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    res.send(genre)
})
const validateGenre = (genre) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}
const port  = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));
