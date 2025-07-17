import { AbstractControl, FormGroup } from "@angular/forms";

export class Utils {
  static getRequiredFieldsInvalid(form: FormGroup) {
    Object.values(form.controls).forEach((field: AbstractControl) => {
      if (field.hasError('required')) {
        field.markAsDirty();
        field.updateValueAndValidity();
      }
    });
  }

  static isNumberString(number: string): boolean {
    let result: any = parseInt(number);
    return Number.isNaN(result) || typeof result != 'number' ? false : true;
  }

  static convertToDouble(number: string): number {
    if (number) {
      return parseFloat(number);
    }
    return 0;
  }

  static convertToBase64(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const fileReader = new FileReader();
      let base64;
      if (file) {
        // lê o arquivo file ou Blob e transforma na string base64
        fileReader.readAsDataURL(file as Blob);

        //aqui quando termina de ler o arquivo ele pega e manda como retorno a string
        fileReader.onload = () => {
          base64 = fileReader.result as string;
          resolve(base64);
        };
      }
      fileReader.onerror = (error: any) => reject(error);
    });
  }

  static convertBase64ToBlob(base64: string) {
    if (base64) {
      const byteString = window.atob(base64!.substring(base64.indexOf(",") + 1));
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      return blob;
    }
    return null;
  }
}
