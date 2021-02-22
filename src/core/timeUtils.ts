/**
 * Simple function to humanize time on format 'x hours y min z s'
 * We could use a built in library but regarding the needs in the project,
 * a super light weight function is better in my opinion
 */
export const humanizeTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  const minutes = Math.floor((timeInSeconds - hours * 60 * 60) / 60)
  const seconds = timeInSeconds % 60

  return (
    (hours > 0 ? `${hours} hours ` : '') +
    (minutes > 0 ? `${minutes} min ` : '') +
    (seconds > 0 ? `${seconds} s ` : '')
  )
}
