/**
 * Generates a random reference number consisting of letters and numbers
 * @returns reference number
 */

export default function EnquiryReferenceNumber() {
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomLetter() {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * characterLength));
  }

  let referenceNumber = "";
  for (let i = 0; i < 6; i++) {
    let randomNr = Math.floor(Math.random() * 2);
    if (randomNr === 0) {
      referenceNumber += getRandomNumber(10).toString();
    } else {
      referenceNumber += getRandomLetter();
    }
  }
  return referenceNumber;
}
