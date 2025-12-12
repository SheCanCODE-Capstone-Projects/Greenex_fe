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