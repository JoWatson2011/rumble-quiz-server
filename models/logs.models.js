const format = require("pg-format");
const db = require("../db/connection");

exports.addGameDataToLog = (gameData) => {
  if (gameData.length === 0)
    return Promise.reject({ status: 400, msg: "Bad Request" });
  const insertQueryStr = format(
    `INSERT INTO 
    logs (game_id, player_id, won_game, points_gained, topic_name)
     VALUES %L
     RETURNING *;`,
    gameData.map(
      ({ game_id, player_id, won_game, points_gained, topic_name }) => [
        game_id,
        player_id,
        won_game,
        points_gained,
        topic_name,
      ]
    )
  );
  return db.query(insertQueryStr).then(({ rows }) => {
    return rows;
  });
};