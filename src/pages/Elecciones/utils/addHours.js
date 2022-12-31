function addHours(text, hours = 8) {
   const [hourNum, minNum] = text.split(':')
   const time = new Date(0, 0, 0, hourNum, minNum)
   time.setTime(time.getTime() + (hours * 60 * 60 * 1000))
   return `${time.getHours()}:${time.getMinutes()}`
}
export { addHours };