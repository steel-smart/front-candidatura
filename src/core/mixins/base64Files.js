export default {
  methods: {
    base64Files(files) {
      return Promise.all(files.map(file => this.convertFileToBase64(file)));
    },
    convertFileToBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function (event) {
          resolve({name: file.name, base64: event.target.result});
        };
        reader.readAsDataURL(file);
      });
    },
    fileToBase64(file) {
      return Promise.resolve(this.convertFileToBase64(file))
    },
  }
}
