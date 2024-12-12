function getMotivationalQuote() {
  const quotes = [
    "Pedal your way to a healthier life!",
    "Every ride is a step towards fitness.",
    "Feel the wind, enjoy the ride.",
    "Cycling: good for you, good for the planet.",
    "Ride to work, feel great all day.",
    "Two wheels, endless possibilities.",
    "Take the scenic route to work today.",
    "Breathe in, pedal out, repeat.",
    "Start your day on two wheels.",
    "Save money, get fit, ride a bike.",
    "Less traffic, more freedom, ride today.",
    "Cycling makes mornings better.",
    "Good vibes come with every ride.",
    "Beat the traffic, ride your bike.",
    "Your bike, your path, your choice.",
    "Riding to work is better than driving.",
    "Turn your commute into an adventure.",
    "Bike to work, boost your mood.",
    "The best part of your day? The ride.",
    "Wake up, ride, conquer the day.",
    "Bike more, worry less.",
    "Enjoy the journey, not just the destination.",
    "Riding is the new coffee.",
    "Feel the joy of cycling to work.",
    "Turn stress into sweat, ride more.",
    "Ride your way to happiness.",
    "Cycling: the ride that energizes you.",
    "Pedal for a better world.",
    "Keep calm and ride on.",
    "Ride, recharge, repeat.",
    "Start strong, ride all day.",
    "Your bike, your commute, your power."
  ]

  // Saadaan nykyinen päivämäärä ja käytetään sen aikaleimaa
  const date = new Date()
  const startOfYear: Date = new Date(date.getFullYear(), 0, 0)
  const dayOfYear: number = Math.floor((+date - +startOfYear) / (1000 * 60 * 60 * 24))


  // Lasketaan index jakojäännöksellä
  const index = dayOfYear % quotes.length

  // Palautetaan valittu lause
  return quotes[index]
}


export default getMotivationalQuote