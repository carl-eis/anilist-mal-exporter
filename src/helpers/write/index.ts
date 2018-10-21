import fs from 'fs';
import util from 'util';

export default (data, filename: string, error?: boolean) => {
  const cleanData = util.inspect(data);

  if (error) {
    return fs.writeFile(`datafiles/${filename}.json`, cleanData, () => {
      // console.log('wrote file: ', filename);
    })
  }

  fs.writeFile(`datafiles/${filename}.json`, JSON.stringify(data, null, 2), () => {
    // console.log('wrote file: ', filename);
  })
}
