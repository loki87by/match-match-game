export default {
  content: [
    {
      div: {
        children: [
          {
            h2: {
              class: 'main__game-timer',
              text: '00:00',
            },
          },
          {
            div: {
              class: 'main__game-cards-container',
            },
          },
        ],
        class: 'main__container main__container_game',
      },
    },
  ],
  id: 'game',
};
