
/**
 * Calculate average rating from an array of rating numbers
 * @param {number[]} ratings - Array of ratings (e.g. [5, 4, 3])
 * @returns {number} average rating rounded to one decimal
 */
export function calculateRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings.reduce((acc, curr) => acc + curr, 0);
  const average = total / ratings.length;

  return Math.round(average * 10) / 10; // Round to 1 decimal place
}
