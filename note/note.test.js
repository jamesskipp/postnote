const expect = require('expect');
const fs = require('fs');

const note = require('../note/note');

const dirPath = './note/test_files_txt/';
const filePath = dirPath + 'test_File_1';
const fileBody = 'some testing text';

beforeEach((done) => {
  fs.mkdir(dirPath, () => {
    fs.writeFile(filePath, fileBody, (error) => {
      if (error) throw error;
      done();
    });
  });
});

describe('getTitle', () => {
  it('should replace _ with spaces in a valid file name', (done) => {
    const filePath = 'test/test_File_1.txt';
    fs.appendFileSync(filePath, '');

    note.getTitle(filePath).then((title) => {
      expect(title).toEqual('test File 1');
      expect(typeof title).toBe('string');
      done();
    }).catch((err) => done(err));
  });
});

describe('getBody', () => {
  it('should return the contents of the file', (done) => {
    note.getBody(filePath).then((body) => {
      expect(body).toEqual(fileBody);
      done();
    }).catch((err) => done(err));
  });
});
