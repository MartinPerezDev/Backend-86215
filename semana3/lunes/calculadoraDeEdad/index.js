import moment from "moment";

const calculateDays = (newBirthDay) => {
  const now = moment();
  const birthDay = moment(newBirthDay, "DD-MM-YYYY");

  const days = now.diff(birthDay, "days");
  return `Desde que naciste hasta el dia de hoy, pasaron ${days} dias`;
};

console.log( calculateDays("09/02/2004") );