import { ImageSourcePropType } from "react-native";

export type Asset = {
  id: string;
  image: ImageSourcePropType;
};

export type Game = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  assets: Asset[];
  bgImage: ImageSourcePropType;
  rows: number;
};

const games: Game[] = [
  {
    id: "1",
    name: "Game 1",
    image: require("../assets/images/app/games/game1.png"),
    bgImage: require("../assets/images/app/games/bg1.png"),
    rows: 2,
    assets: [
      {
        id: "1",
        image: require("../assets/images/app/games/asset1_1.png"),
      },
      {
        id: "2",
        image: require("../assets/images/app/games/asset1_2.png"),
      },
    ],
  },
  {
    id: "2",
    name: "Game 2",
    image: require("../assets/images/app/games/game2.png"),
    bgImage: require("../assets/images/app/games/bg2.png"),
    rows: 2,
    assets: [
      {
        id: "1",
        image: require("../assets/images/app/games/asset2_1.png"),
      },
      {
        id: "2",
        image: require("../assets/images/app/games/asset2_2.png"),
      },
      {
        id: "3",
        image: require("../assets/images/app/games/asset2_3.png"),
      },
      {
        id: "4",
        image: require("../assets/images/app/games/asset2_4.png"),
      },
    ],
  },
];

export default games;
