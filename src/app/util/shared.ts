import { Constants } from "./constants";

export class Shared {

  constructor() {}

  public static initializeWebStorage(): void {

    if (localStorage.getItem(Constants.KEY_LANCAMENTOS) != null) {
      return;
    }

    localStorage.setItem(Constants.KEY_LANCAMENTOS, JSON.stringify([]));
    localStorage.setItem(Constants.KEY_USUARIOS, JSON.stringify([]));
  }
}
