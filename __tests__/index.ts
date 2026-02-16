import { describe, expect, test } from '@jest/globals';
import {
  otherPlayer,
  playerToString,
  scoreWhenPoint,
  love,
  fifteen,
  thirty,
} from '..';

describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});

describe('Tests for transition functions', () => {
  // test('Given deuce, score is advantage to winner', () => {
  //   console.log('To fill when we will know how represent Deuce');
  // });
  // test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given advantage when otherPlayer wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given a player at 40 when the same player wins, score is Game for this player', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // -------------------------TESTS POINTS-------------------------- //
  test('Given players at 0 or 15 points score kind is still POINTS', () => {
    const s1 = { PLAYER_ONE: love(), PLAYER_TWO: love() };
    const r1 = scoreWhenPoint(s1, 'PLAYER_ONE');
    expect((r1 as any).kind).toStrictEqual('POINTS');

    const s2 = { PLAYER_ONE: fifteen(), PLAYER_TWO: love() };
    const r2 = scoreWhenPoint(s2, 'PLAYER_TWO');
    expect((r2 as any).kind).toStrictEqual('POINTS');
  });

  test('Given one player at 30 and win, score kind is forty', () => {
    const s = { PLAYER_ONE: thirty(), PLAYER_TWO: love() };
    const r = scoreWhenPoint(s, 'PLAYER_ONE');
    expect((r as any).kind).toStrictEqual('FORTY');
    expect((r as any).fortyData.player).toStrictEqual('PLAYER_ONE');
  });
});
