export default {
  content: [
    {
      div: {
        children: [
          {
            div: {
              children: [
                {
                  h2: {
                    class: 'main__title',
                    text: 'Game cards',
                  },
                },
                {
                  select: {
                    children: [
                      {
                        option: {
                          disabled: 'true',
                          text: 'select game cards type',
                          selected: 'true',
                        },
                      },
                      {
                        option: {
                          value: 'animals',
                          text: 'Animals',
                        },
                      },
                      {
                        option: {
                          value: 'animations',
                          text: 'Toons',
                        },
                      },
                      {
                        option: {
                          value: 'auto',
                          text: 'Cars',
                        },
                      },
                      {
                        option: {
                          value: 'comics',
                          text: 'Marvel cinema',
                        },
                      },
                      {
                        option: {
                          value: 'moto',
                          text: 'Motorcycles',
                        },
                      },
                    ],
                    class: 'main__settings-select',
                    id: 'cards-type',
                  },
                },
              ],
              class: 'main__settings-element',
            },
          },
          {
            div: {
              children: [
                {
                  h2: {
                    class: 'main__title',
                    text: 'Difficulty',
                  },
                },
                {
                  select: {
                    children: [
                      {
                        option: {
                          disabled: 'true',
                          text: 'select game type',
                          selected: 'true',
                        },
                      },
                      {
                        option: {
                          value: '16',
                          text: '4*4',
                        },
                      },
                      {
                        option: {
                          value: '20',
                          text: '5*4',
                        },
                      },
                      {
                        option: {
                          value: '24',
                          text: '6*4',
                        },
                      },
                      {
                        option: {
                          value: '30',
                          text: '6*5',
                        },
                      },
                      {
                        option: {
                          value: '36',
                          text: '6*6',
                        },
                      },
                      {
                        option: {
                          value: '42',
                          text: '6*7',
                        },
                      },
                      {
                        option: {
                          value: '48',
                          text: '6*8',
                        },
                      },
                      {
                        option: {
                          value: '56',
                          text: '7*8',
                        },
                      },
                      {
                        option: {
                          value: '64',
                          text: '8*8',
                        },
                      },
                    ],
                    class: 'main__settings-select',
                    id: 'difficulty',
                  },
                },
              ],
              class: 'main__settings-element',
            },
          },
        ],
        class: 'main__container main__container_settings',
      },
    },
  ],
  id: 'settings',
};
