// datas
import db from "./_db.js";

// If props doesn't allow null put the exclamation mark
export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!
  }

  type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
  }
`;

export const resolvers = {
  Query: {
    games: () => db.games,
    game: (_, args) => db.games.find((game) => game.id === args.id),
    reviews: () => db.reviews,
    review: (_, args) => db.reviews.find((review) => review.id === args.id),
    authors: () => db.authors,
    author: (_, args) => db.authors.find((author) => author.id === args.id),
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
};
