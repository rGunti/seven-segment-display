import { writeFileSync } from 'fs';
import * as dateFormat from 'dateformat';

const now = new Date();
writeFileSync(
  'src/assets/version.json',
  JSON.stringify({
    version: {
      major: now.getFullYear() % 100,
      minor: now.getMonth() + 1,
      patch: now.getDay(),
      revision: `${dateFormat.default(now, 'HH.MM.ss')}`,
    },
    author: 'rGunti',
  })
);
