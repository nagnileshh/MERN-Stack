import express from 'express'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const d = new Date("June 24, 2023 11:30:00")
    const day = d.getDay()

    let type = "a weekday"
    let adv = "It's time to word hard."

    if(day === 0 || day === 6){
        type = "the weekend"
        adv = "It's still time to work hard."
    }

    res.render("index.ejs", {
        dayType: type,
        advice: adv,
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});