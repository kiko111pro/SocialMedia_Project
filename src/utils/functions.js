export const numbersOnlyRegex = /^\d+$/;

export const truncate = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + '...';
  }
};

export const getAge = dateString => {
  if (!dateString) return null;
  let dob = dateString.split(' ');
  let birth_month = dob[1];
  let birth_day = dob[2];
  let birth_year = dob[3];
  today_date = new Date();
  today_year = today_date.getFullYear();
  today_month = today_date.getMonth();
  today_day = today_date.getDate();
  age = today_year - birth_year;

  if (today_month < birth_month - 1) {
    age--;
  }
  if (birth_month - 1 == today_month && today_day < birth_day) {
    age--;
  }
  return age;
};

export const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

export const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};
