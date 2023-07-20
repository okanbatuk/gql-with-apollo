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

  type Mutation {
    addGame(game: AddGameInput!): Game
    updateGame(id: ID!, edits: UpdateGameInput!) : Game
    deleteGame(id: ID!): [Game]

    addReview(review: AddReviewInput!): Review
    updateReview(id: ID!, edits: UpdateReviewInput!): Review
    deleteReview(id: ID!): [Review]
    
    addAuthor(author: AddAuthorInput!): Author
    updateAuthor(id: ID!, edits: UpdateAuthorInput!): Author
    deleteAuthor(id: ID!): [Author]
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input UpdateGameInput {
    title: String
    platform: [String!]
  }

  input AddReviewInput {
    rating: Int!
    content: String!
    author_id: String!
    game_id: String!
  }

  input UpdateReviewInput {
    rating: Int
    content: String
    author_id: String
    game_id: String
  }

  input AddAuthorInput {
    name: String!
    verified: Boolean!
  }

  input UpdateAuthorInput {
    name: String
    verified: Boolean
  }
`;

export const resolvers = {
  Query: {
    // Game Queries
    games: () => db.games,
    game: (_, args) => db.games.find((game) => game.id === args.id),

    // Review Queries
    reviews: () => db.reviews,
    review: (_, args) => db.reviews.find((review) => review.id === args.id),

    // Author Queries
    authors: () => db.authors,
    author: (_, args) => db.authors.find((author) => author.id === args.id),
  },

  // Relations
  Game: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.game_id === parent.id),
  },
  Author: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.author_id === parent.id),
  },
  Review: {
    author: (parent) =>
      db.authors.find((author) => author.id === parent.author_id),
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
  },

  // Mutations
  Mutation: {
    addGame: (_, args) => {
      // Create new game
      let newGame = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...args.game,
      };
      // Push the new game
      db.games.push(newGame);

      return newGame;
    },
    updateGame: (_, args) => {
      db.games = db.games.map((game) => {
        return game.id === args.id ? { ...game, ...args.edits } : game;
      });

      return db.games.find((game) => game.id === args.id);
    },

    deleteGame: (_, args) => db.games.filter((game) => game.id !== args.id),

    addReview: (_, args) => {
      let newReview = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...args.review,
      };

      db.reviews.push(newReview);
      return newReview;
    },
    updateReview: (_, args) => {
      db.reviews = db.reviews.map((review) => {
        return review.id === args.id ? { ...review, ...args.edits } : review;
      });

      return db.reviews.find((review) => review.id === args.id);
    },
    deleteReview: (_, args) =>
      db.reviews.filter((review) => review.id !== args.id),

    addAuthor: (_, args) => {
      let newAuthor = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...args.author,
      };
      db.authors.push(newAuthor);
      return newAuthor;
    },
    updateAuthor: (_, args) => {
      db.authors = db.authors.map((author) => {
        return author.id === args.id ? { ...author, ...args.edits } : author;
      });

      return db.authors.find((author) => author.id === args.id);
    },
    deleteAuthor: (_, args) =>
      db.authors.filter((author) => author.id !== args.id),
  },
};
