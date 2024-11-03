import { alphabet } from "../constants/alphabet";

export const encrypt = (plainText, gamma) => {
  const n = alphabet.length;
  let encryptedText = "";

  for (let i = 0; i < plainText.length; i++) {
    const textChar = plainText[i].toLowerCase(); // Зводимо до нижнього регістру
    const keyChar = gamma[i % gamma.length].toLowerCase();
    const m = alphabet.indexOf(textChar);
    const k = alphabet.indexOf(keyChar);
    
    if (m === -1 || k === -1) continue; // Пропускаємо символи, що не входять до алфавіту

    const c = (m + k) % n;
    encryptedText += alphabet[c];
  }

  return encryptedText;
};