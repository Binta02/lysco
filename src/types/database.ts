export interface ServiceData {
  title: string
  price: string
  description: string
  priceUnit?: string
  originalPrice?: string
  isPromo?: boolean
  note?: string
}

export interface CoworkingPrices { hour: number }
export interface FormationRoomPrices { hour: number; halfDay: number; fullDay: number }
export interface LocationBureauPrices { halfDay: number; fullDay: number }

export interface ReservationPrices {
  'coworking-space': CoworkingPrices
  'formation-room': FormationRoomPrices
  'location-bureau': LocationBureauPrices
}
export interface ReservationInsert {
  id?: string;
  user_id: string;
  space_id: string;
  reservation_type: string;
  reservation_date: string;
  period: string; // Format PostgreSQL : '[start,end)'
  price: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
