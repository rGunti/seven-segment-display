import * as dateFormat from 'dateformat';
import { writeFileSync } from 'fs';

const now = new Date();
writeFileSync(
  'src/assets/version.json',
  JSON.stringify({
    version: {
      major: now.getFullYear() % 100,
      minor: now.getMonth() + 1,
      patch: now.getDate(),
      revision: `${dateFormat.default(now, 'HH.MM.ss')}`,
    },
    author: 'rGunti',
  }),
);
