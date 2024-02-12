export default class Utils {
  convertToBase64(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const fileReader = new FileReader();
      let base64;
      // lê o arquivo file ou Blob e transforma na string base64
      fileReader.readAsDataURL(file as Blob);

      //aqui quando termina de ler o arquivo ele pega e manda como retorno a string
      fileReader.onload = () => {
        base64 = fileReader.result as string;
        resolve(base64);
      };
      fileReader.onerror = (error: any) => reject(error);
    });
  }
}
