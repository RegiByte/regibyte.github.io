import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import './index.css';
import { useDrag } from '@use-gesture/react';

const allCards = [
  'ace_of_clubs.svg',
  'ace_of_diamonds.svg',
  'ace_of_hearts.svg',
  'ace_of_spades.svg',
  '2_of_clubs.svg',
  '2_of_diamonds.svg',
  '2_of_hearts.svg',
  '2_of_spades.svg',
  '3_of_clubs.svg',
  '3_of_diamonds.svg',
  '3_of_hearts.svg',
  '3_of_spades.svg',
  '4_of_clubs.svg',
  '4_of_diamonds.svg',
  '4_of_hearts.svg',
  '4_of_spades.svg',
  '5_of_clubs.svg',
  '5_of_diamonds.svg',
  '5_of_hearts.svg',
  '5_of_spades.svg',
  '6_of_clubs.svg',
  '6_of_diamonds.svg',
  '6_of_hearts.svg',
  '6_of_spades.svg',
  '7_of_clubs.svg',
  '7_of_diamonds.svg',
  '7_of_hearts.svg',
  '7_of_spades.svg',
  '8_of_clubs.svg',
  '8_of_diamonds.svg',
  '8_of_hearts.svg',
  '8_of_spades.svg',
  '9_of_clubs.svg',
  '9_of_diamonds.svg',
  '9_of_hearts.svg',
  '9_of_spades.svg',
  '10_of_clubs.svg',
  '10_of_diamonds.svg',
  '10_of_hearts.svg',
  '10_of_spades.svg',
  'black_joker.svg',
  'jack_of_clubs.svg',
  'jack_of_diamonds.svg',
  'jack_of_hearts.svg',
  'jack_of_spades.svg',
  'king_of_clubs.svg',
  'king_of_diamonds.svg',
  'king_of_hearts.svg',
  'king_of_spades.svg',
  'queen_of_clubs.svg',
  'queen_of_diamonds.svg',
  'queen_of_hearts.svg',
  'queen_of_spades.svg',
];

const getCardKey = (card: string) => card.split('_')[0];

const filteredCards = ((cards) => {
  const usedKeys = new Set();
  const usedCards = new Set();

  cards.forEach((card) => {
    const cardKey = getCardKey(card);
    if (!usedKeys.has(cardKey)) {
      usedKeys.add(cardKey);

      const allCardsWithKey = cards.filter((c) => getCardKey(c) === cardKey);
      const selectedCard =
        allCardsWithKey[Math.floor(Math.random() * allCardsWithKey.length)];
      usedCards.add(selectedCard);
    }
  });

  return Array.from(usedCards);
})(allCards);

const cardImages = filteredCards
  .map((card) => `/assets/poker-cards/${card}`)
  .slice(0, 7);

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 150,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const transformCard = (r: number, s: number) => {
  const windowInnerWidth =
    typeof window === 'undefined' ? 1000 : window.innerWidth;
  const perspective = windowInnerWidth * 1.5;
  return `perspective(${perspective.toFixed(0)}px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;
};

export const DeckOfCards = () => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [springs, api] = useSprings(cardImages.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag((params) => {
    const {
      args: [index],
      down,
      movement: [mx, my],
      direction: [xDir],
      velocity,
    } = params;
    const velocityX = velocity[0];
    const velocityY = velocity[1];
    const velocityFactor = Math.sqrt(velocityX ** 2 + velocityY ** 2);
    const trigger = velocityFactor > 0.4; // If you flick hard enough it should trigger the card to fly out
    const dirX = xDir < 0 ? -1 : 1; // Direction should either point left or right
    const dirY = my < 0 ? -1 : 1; // Direction should either point up or down
    if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dirX : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const y = isGone ? (200 + window.innerHeight) * dirY : down ? my : 0;
      const rotation = mx / 100 + (isGone ? dirX * 10 * velocityFactor : 0); // How much the card tilts, flicking it harder makes it rotate faster

      const scale = down ? 1.15 : 1; // Active cards lift up a bit
      return {
        x,
        y,
        rot: rotation,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
    const allCardsAreGone = gone.size === cardImages.length;
    if (!down && allCardsAreGone)
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
  }, {});

  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-sky-300 dark:bg-gray-900">
        <h1
          className={
            'absolute top-32 text-2xl font-bold text-slate-800 dark:text-slate-300'
          }>
          Animated Deck of Cards
        </h1>
        {springs.map(({ x, y, rot, scale }, i) => {
          const cardImage = cardImages[i];
          return (
            <animated.div className={'deck'} key={i} style={{ x, y }}>
              {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
              <animated.div
                {...bind(i)}
                style={{
                  transform: interpolate([rot, scale], transformCard),
                  backgroundImage: `url(${cardImage})`,
                }}
              />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
