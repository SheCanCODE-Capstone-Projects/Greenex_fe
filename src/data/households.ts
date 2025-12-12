export interface Household {
  id: string;
  zone_id: string;
  household_code: string;
  head_of_household: string;
  phone: string;
  house_type: 'Apartment' | 'Bungalow' | 'Duplex' | 'Other';
  number_of_people: number;
  address_description: string;
}

export interface Zone {
  id: string;
  sector: string;
  cell: string;
  village: string;
  code: string;
  description: string;
}

export const dummyZones: Zone[] = [
  {
    id: "1",
    sector: "Kicukiro",
    cell: "Gahanga",
    village: "Kabuga",
    code: "KIC-GAH-001",
    description: "Residential area with mixed commercial activities"
  },
  {
    id: "2",
    sector: "Gasabo",
    cell: "Remera",
    village: "Kisimenti",
    code: "GAS-REM-002",
    description: "Urban commercial district with high-rise buildings"
  },
  {
    id: "3",
    sector: "Nyarugenge",
    cell: "Nyamirambo",
    village: "Biryogo",
    code: "NYA-NYA-003",
    description: "Dense residential area with local markets"
  },
  {
    id: "4",
    sector: "Kicukiro",
    cell: "Niboye",
    village: "Gatenga",
    code: "KIC-NIB-004",
    description: "Suburban residential zone with schools"
  },
  {
    id: "5",
    sector: "Gasabo",
    cell: "Kinyinya",
    village: "Kagugu",
    code: "GAS-KIN-005",
    description: "Mixed residential and commercial development"
  }
];

export const dummyHouseholds: Household[] = [
  {
    id: "1",
    zone_id: "1",
    household_code: "HH-KIC-001",
    head_of_household: "Jean Baptiste Uwimana",
    phone: "+250788123456",
    house_type: "Bungalow",
    number_of_people: 5,
    address_description: "Near Kabuga market, blue gate house"
  },
  {
    id: "2",
    zone_id: "2",
    household_code: "HH-GAS-002",
    head_of_household: "Marie Claire Mukamana",
    phone: "+250789234567",
    house_type: "Apartment",
    number_of_people: 3,
    address_description: "Kisimenti Heights, Block A, Apt 205"
  },
  {
    id: "3",
    zone_id: "3",
    household_code: "HH-NYA-003",
    head_of_household: "Paul Nkurunziza",
    phone: "+250787345678",
    house_type: "Duplex",
    number_of_people: 7,
    address_description: "Biryogo sector, near mosque"
  },
  {
    id: "4",
    zone_id: "1",
    household_code: "HH-KIC-004",
    head_of_household: "Grace Uwimana",
    phone: "+250786456789",
    house_type: "Bungalow",
    number_of_people: 4,
    address_description: "Gatenga cell, opposite primary school"
  },
  {
    id: "5",
    zone_id: "4",
    household_code: "HH-KIC-005",
    head_of_household: "Emmanuel Habimana",
    phone: "+250785567890",
    house_type: "Other",
    number_of_people: 6,
    address_description: "Traditional house near health center"
  },
  {
    id: "6",
    zone_id: "5",
    household_code: "HH-GAS-006",
    head_of_household: "Immaculee Nyirahabimana",
    phone: "+250784678901",
    house_type: "Apartment",
    number_of_people: 2,
    address_description: "Kagugu modern complex, Unit 12"
  }
];