/**
 * Booking occupancy & pricing calculations.
 *
 * Rules:
 *  - Children older than 10 years count as adults (effectiveAdults).
 *  - Each room can accommodate up to maxOccupancy guests normally, plus
 *    exactly 1 extra adult with an extraAdultCharge.
 *  - Extra rooms are only required when effectiveAdults exceeds
 *    selectedRooms × (maxOccupancy + 1).
 */

/** GST rate applied to both room rent and extra adult charges (5%). */
export const BOOKING_TAX_RATE = 0.05;

/** Extra adult surcharge per room per night, in rupees (display units). */
export const EXTRA_ADULT_CHARGE = 1000;

/** Extra adult surcharge per room per night, in paise (API/cents units). */
export const EXTRA_ADULT_CHARGE_CENTS = 100000;

/**
 * Returns the minimum number of rooms needed.
 * Extra rooms are only added when the guests cannot fit even with
 * one extra adult per selected room.
 */
export function getRoomsNeeded(
  effectiveAdults: number,
  maxOccupancy: number,
  selectedRooms: number
): number {
  if (effectiveAdults <= selectedRooms * (maxOccupancy + 1)) return selectedRooms;
  return Math.ceil(effectiveAdults / (maxOccupancy + 1));
}

/**
 * Returns how many rooms need an extra adult charge.
 * Each room can have at most 1 extra adult beyond maxOccupancy.
 */
export function getExtraAdultCount(
  effectiveAdults: number,
  maxOccupancy: number,
  roomsForTotal: number
): number {
  const extra = effectiveAdults - roomsForTotal * maxOccupancy;
  if (extra <= 0) return 0;
  return Math.min(extra, roomsForTotal);
}
