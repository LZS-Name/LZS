const fontFamily = [
  {
    fontFamily: "ConcertOne",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('ConcertOne'),
      local('ConcertOne-Regular'),
      url(${process.env.REACT_PUBLIC_URL}/fonts/ConcertOne-Regular.ttf) format('truetype')
    `,
  },
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('Roboto'),
      local('Roboto-Regular'),
      url(${process.env.REACT_PUBLIC_URL}/fonts/Roboto-Regular.ttf) format('truetype')
    `,
  },
  {
    fontFamily: "Roboto-Light",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
      local('Roboto-Light'),
      url(${process.env.REACT_PUBLIC_URL}/fonts/Roboto-Light.ttf) format('truetype')
    `,
  },
];

export default fontFamily;
