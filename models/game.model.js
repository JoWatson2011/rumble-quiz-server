const ongoingGames = {};
const axios = {}
const createGameData = (topic_id) => {
  ongoingGames[topic_id] = {
    players_active: [],
    players_eliminated: [],
    round_counter: 0,
    avatar_urls: {},
    points: {},
  };
};

const addPlayerToGame = (username, avatarUrl, topic_id) => {
  const game = ongoingGames[topic_id];
  game.players_active.push(username);
  game.avatar_urls[username] = avatarUrl;
  game.points[username] = 0;
};

const updateGameData = (topic_id, answerData) => {
  const game = ongoingGames[topic_id];

  game.round_counter++;
  if (answerData.eliminated) {
    const index = game.players_active.indexOf(answerData.username);
    game.players_active.splice(index, 1);
    game.players_eliminated.push(answerData.username);
    game.avatar_urls[answerData.username] =
      "https://img.icons8.com/?size=100&id=7703&format=png&color=000000";
  }
  game.points[answerData.username] += answerData.points;
};

const logGameData = (topic_id) => {
  const game = ongoingGames[topic_id];

};

module.exports = {
  addPlayerToGame,
  ongoingGames,
  createGameData,
  updateGameData,
  logGameData,
};
