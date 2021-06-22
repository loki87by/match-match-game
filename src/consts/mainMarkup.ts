export default {
  content: [
    {
      div: {
        children: [
          {
            h2: {
              class: 'main__title',
              text: 'How to play?',
            },
          },
          {
            ul: {
              children: [
                {
                  li: {
                    children: [
                      {
                        div: {
                          children: [
                            {
                              h3: {
                                text: '1',
                                class: 'main__about-rule-counter',
                              },
                            },
                            {
                              h4: {
                                text: 'Register new player in game',
                                class: 'main__about-rule-title',
                              },
                            },
                          ],
                          class: 'main__about-rule-description',
                        },
                      },
                      {
                        img: {
                          alt: 'example popup',
                          src: '../src/assets/images/popup.jpg',
                          class: 'main__about-rule-image_popup',
                        },
                      },
                    ],
                    class: 'main__about-rule',
                  },
                },
                {
                  li: {
                    children: [
                      {
                        div: {
                          children: [
                            {
                              h3: {
                                text: '2',
                                class: 'main__about-rule-counter',
                              },
                            },
                            {
                              h4: {
                                text: 'Configure your game settings',
                                class: 'main__about-rule-title',
                              },
                            },
                          ],
                          class: 'main__about-rule-description',
                        },
                      },
                      {
                        img: {
                          alt: 'example settings',
                          src: '../src/assets/images/set-button.jpg',
                          class: 'main__about-rule-image_settings',
                        },
                      },
                    ],
                    class: 'main__about-rule',
                  },
                },
                {
                  li: {
                    children: [
                      {
                        div: {
                          children: [
                            {
                              h3: {
                                text: '3',
                                class: 'main__about-rule-counter',
                              },
                            },
                            {
                              h4: {
                                text: 'Start you new game! Remember card positions and match it before times up.',
                                class: 'main__about-rule-title',
                              },
                            },
                          ],
                          class: 'main__about-rule-description',
                        },
                      },
                      {
                        img: {
                          alt: 'example game',
                          src: '../src/assets/images/game.jpg',
                          class: 'main__about-rule-image_game',
                        },
                      },
                    ],
                    class: 'main__about-rule',
                  },
                },
              ],
              class: 'main__content',
            },
          },
        ],
        class: 'main__container main__container_about',
      },
    },
  ],
  id: 'main',
};
