function addZero(num: number): string {
  return num < 10 ? "0" + num : "" + num;
}

export function getKorDate(createdSeconds: number) {
  const date = new Date(createdSeconds * 1000);
  return `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}:${addZero(date.getSeconds())}`;
}
