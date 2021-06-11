import { MovieModel } from "./movie"

test("can be created", () => {
  const instance = MovieModel.create({
    "id": 337404,
    "title": "Cruella",
    "original_title": "Cruella",
    "overview": "In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.",
    "poster_path": "/rTh4K5uw9HypmpGslcKd4QfHl93.jpg",
    "backdrop_path": "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
    "release_date": "2021-05-26",
    "popularity": 6077.166,
    "vote_average": 8.7,
    "vote_count": 2284
  })

  expect(instance).toBeTruthy()
})
