import { Player, stringToPlayer, isSamePlayer } from './types/player';
import {
  Point,
  PointsData,
  Score,
  FortyData,
  deuce,
  game,
  forty,
  points,
  advantage,
  fifteen,
  thirty,
} from './types/score';
export { love, fifteen, thirty, points, forty, deuce, advantage, game } from './types/score';
import { pipe, Option } from 'effect'

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return stringToPlayer('PLAYER_TWO');
    case 'PLAYER_TWO':
      return stringToPlayer('PLAYER_ONE');
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>
  (() => {
    switch (point.kind) {
      case 'LOVE':
        return 'Love';
      case 'FIFTEEN':
        return '15';
      case 'THIRTY':
        return '30';
    }
  })();

export const scoreToString = (score: Score): string =>
  (() => {
    switch (score.kind) {
      case 'POINTS':
        return `${pointToString(score.pointsData.PLAYER_ONE)} - ${pointToString(
          score.pointsData.PLAYER_TWO
        )}`;
      case 'FORTY':
        if (score.fortyData.player === 'PLAYER_ONE') {
          return `40 - ${pointToString(score.fortyData.otherPoint)}`;
        }
        return `${pointToString(score.fortyData.otherPoint)} - 40`;
      case 'DEUCE':
        return 'Deuce';
      case 'ADVANTAGE':
        return `Advantage ${playerToString(score.player)}`;
      case 'GAME':
        return `Game ${playerToString(score.player)}`;
    }
  })();

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const incrementPoint = (point: Point): Option.Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return Option.some(fifteen());
    case 'FIFTEEN':
      return Option.some(thirty());
    case 'THIRTY':
      return Option.none();
  }
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    Option.match({
      onNone: () => deuce(),
      onSome: (p) => forty(currentForty.player, p) as Score,
    })
  );
};



// Exercice 2
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const other = otherPlayer(winner);
  const winnerPoint = current[winner];
  return pipe(
    incrementPoint(winnerPoint),
    Option.match({
      onNone: () => forty(winner, current[other]) as Score,
      onSome: (p) =>
        winner === 'PLAYER_ONE'
          ? points(p, current.PLAYER_TWO)
          : points(current.PLAYER_ONE, p),
    })
  );
};

// Exercice 3
export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'GAME':
      return scoreWhenGame(currentScore.player);
  }
};
