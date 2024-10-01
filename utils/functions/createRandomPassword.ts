function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomElement(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function generateRandomPassword() {
  const animals = [
    "mouse", "hourse", "bear", "rabbit", "wolf", "tiger", "zebra", "goat", "whale", "crow", "eagle", "falcon", "dove", "duck",
    "parrot", "robin", "pigeon", "stork", "swan", "spider", "turtle", "fish", "snake", "sheep", "turkey", "snail", "donkey"
  ];
  const objects = [
    "spoon", "coffee", "dish", "glass", "chair", "book", "paper", "ruler", "glue", "clock", "door", "desk", "table", "shoe",
    "shirt", "coin", "water", "watch", "sweet", "photo", "stamp", "brush", "mobile", "pencil", "file", "comb", "mirror", "player", "train"
  ];

  const animal = getRandomElement(animals);
  let object = capitalize(getRandomElement(objects));
  const randomNumber = Math.floor(Math.random() * 100);

  return `${animal}${object}${randomNumber}`;
}