import multer from 'multer';

class MulterService {
  static configureMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        const uploadDir = './images';
        callback(null, uploadDir);
      },
      filename: (req, file, callback) => {
        const fileName = `${file.originalname}`;
        callback(null, fileName);
      }
    });
    return multer({ storage: storage });
  }
}

export default MulterService;
