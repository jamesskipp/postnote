const expect = require('expect');
const fs = require('fs');

const note = require('../note/note');

const dirPath = './note/test_files_txt/';
const filePath = dirPath + 'test_File_1.txt';
const fileBody = 'some testing text';

beforeEach((done) => {
  fs.mkdir(dirPath, () => {
    fs.writeFile(filePath, fileBody, (error) => {
      if (error) throw error;
      fs.mkdir(dirPath + 'one/', () => {
        fs.writeFile(dirPath + 'one/test_File_2.txt', fileBody, (error) => {
          if (error) throw error;
          done();
        });
      });
    });
  });
});

describe('getTitle', () => {
  it('should replace _ with spaces in a valid file name', (done) => {
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

describe('getStats', () => {
  it('should return the creation and edit time of the file', (done) => {
    note.getStats(filePath).then((stats) => {
      expect(typeof stats.btime).toBe('number');
      expect(typeof stats.mtime).toBe('number');
      expect(stats.isFile).toBe(true);
      expect(stats.isDir).toBe(false);
      done();
    }).catch((err) => done(err));
  });
});

describe('fetchNotes', () => {
  it('should return two notes with complete info', (done) => {
    note.fetchNotes(dirPath).then((notes) => {
      console.log('FETCHNOTES RESULT ', notes);
      done();
      expect(notes.length).toBe(2);
      notes.forEach((noteFile) => {
        expect(typeof noteFile.title).toBe('string');
      });
      // done();
    }).catch((err) => done(err));
  });
});
