import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import * as TableAPI from '../utils/TableAPI';
// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  category: 'category',
  date: '2022',
  amount: 30,
  comment: 'comment',
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  actions: 'actions',
  // status: sample(['active', 'banned']),
  // role: sample([
  //   'Leader',
  //   'Hr Manager',
  //   'UI Designer',
  //   'UX Designer',
  //   'UI/UX Designer',
  //   'Project Manager',
  //   'Backend Developer',
  //   'Full Stack Designer',
  //   'Front End Developer',
  //   'Full Stack Developer',
  // ]),
}));

export default users;
