const fauls = [
  "",
  "Rvačka",
  "Naražení na hrazení",
  "Napadení",
  "Naražení zezadu",
  "Krosček",
  "Faul loktem",
  "Hrubost",
  "Vysoká hůl",
  "Držení",
  "Držení hole",
  "Hákování",
  "Nedovolené bránění",
  "Faul kolenem",
  "Sekání",
  "Podražení",
  "Zdržování hry",
];
const convertArrayToObject = (array) => {
    const initialValue = {};
    return array.reduce((obj, item,idx) => {
      return {
        ...obj,
        [idx]: item,
      };
    }, initialValue);
  };

export default fauls;
