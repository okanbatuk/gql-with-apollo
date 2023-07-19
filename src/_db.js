let games = [
  { id: "1", title: "Zelda", platform: ["Switch"] },
  { id: "2", title: "Final", platform: ["PS5", "Xbox"] },
  { id: "3", title: "Elden Ring", platform: ["PS5", "Xbox", "PC"] },
];

let authors = [
  { id: "1", name: "maria", verified: true },
  { id: "2", name: "yoshi", verified: false },
  { id: "3", name: "peach", verified: true },
];

let reviews = [
  { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
  { id: "3", rating: 6, content: "lorem ipsum", author_id: "3", game_id: "3" },
  { id: "4", rating: 5, content: "lorem ipsum", author_id: "2", game_id: "2" },
  { id: "5", rating: 6, content: "lorem ipsum", author_id: "1", game_id: "3" },
  { id: "6", rating: 8, content: "lorem ipsum", author_id: "3", game_id: "1" },
];

export default { games, authors, reviews };
