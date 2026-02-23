export interface StatCard {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconType: "dollar" | "wallet" | "users";
}

export const OVERVIEW_STATS: StatCard[] = [
  {
    name: "Total Cashflow",
    value: "$240,800",
    change: "12.5%",
    isPositive: true,
    iconType: "dollar",
  },
  {
    name: "Platform Revenue",
    value: "$20,800",
    change: "12.5%",
    isPositive: true,
    iconType: "dollar",
  },
  {
    name: "Total transactions",
    value: "12,000",
    change: "1.5%",
    isPositive: true,
    iconType: "wallet",
  },
  {
    name: "Active users",
    value: "2,000",
    change: "1.5%",
    isPositive: true,
    iconType: "users",
  },
];

export interface LineChartDataPoint {
  month: string;
  withdrawal: number;
  offramp: number;
  deposit: number;
}

export const TOTAL_CASHFLOW_CHART_DATA: LineChartDataPoint[] = [
  { month: "Jan", withdrawal: 0, offramp: 30000, deposit: 10000 },
  { month: "Feb", withdrawal: 10000, offramp: 40000, deposit: 15000 },
  { month: "Mar", withdrawal: 35000, offramp: 18000, deposit: 25000 },
  { month: "Apr", withdrawal: 85000, offramp: 40000, deposit: 35000 },
  { month: "May", withdrawal: 105000, offramp: 80000, deposit: 45000 },
  { month: "Jun", withdrawal: 110000, offramp: 65000, deposit: 55000 },
  { month: "Jul", withdrawal: 105000, offramp: 60000, deposit: 65000 },
  { month: "Aug", withdrawal: 130000, offramp: 165000, deposit: 75000 },
  { month: "Sep", withdrawal: 160000, offramp: 140000, deposit: 85000 },
  { month: "Oct", withdrawal: 175000, offramp: 85000, deposit: 95000 },
  { month: "Nov", withdrawal: 190000, offramp: 55000, deposit: 105000 },
  { month: "Dec", withdrawal: 195000, offramp: 85000, deposit: 115000 },
];

export interface BarChartDataPoint {
  month: string;
  offramp: number;
  withdrawal: number;
  deposit: number;
}

export const PLATFORM_REVENUE_CHART_DATA: BarChartDataPoint[] = [
  { month: "Jan", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Feb", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Mar", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Apr", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "May", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Jun", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Jul", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Aug", offramp: 35000, withdrawal: 115000, deposit: 55000 },
  { month: "Sep", offramp: 35000, withdrawal: 115000, deposit: 55000 },
];

export interface Transaction {
  id: string; // The short display ID
  fullId?: string; // The long true transaction ID
  user: string;
  time: string;
  amount: string; // Total amount as string for table
  gross?: string;
  fee?: string;
  netCredited?: string;
  type: "Offramping" | "Deposit";
  status: "Pending" | "Completed" | "Failed";
  fromUser?: { name: string; isVerified: boolean };
  toUser?: { name: string; isVerified: boolean; type?: "user" | "bank" };
  fromAddress?: string;
  toAddress?: string;
  address: string; // The receiving short address for table
}

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "010..12dcb",
    fullId: "010455757583839_aec43bdjfhr87hghghfg4678sbsbn",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 14:24",
    amount: "$150,000",
    gross: "$150,000.00",
    fee: "$10.00",
    netCredited: "$149,990.00",
    type: "Offramping",
    status: "Pending",
    fromUser: { name: "Blessing Jeremiah", isVerified: true },
    toUser: { name: "Josiah Dennis", isVerified: false, type: "user" },
    fromAddress: "0x19188ce63b174028A7690a0C9984Ac86EDb4B325",
    toAddress: "0x19188ce63b174028A7690a0C9984Ac86EDb4B325",
    address: "0x1...36gf",
  },
  {
    id: "025..12deh",
    fullId: "025566787893994_bec54cdkgir98hjijikg5789tctco",
    user: "Temitope",
    time: "Jan 1, 2026 02:04",
    amount: "$2m",
    gross: "$2,000,000.00",
    fee: "$50.00",
    netCredited: "$1,999,950.00",
    type: "Deposit",
    status: "Failed",
    fromUser: { name: "Temitope Adebayo", isVerified: true },
    toUser: { name: "GTBANK", isVerified: true, type: "bank" },
    fromAddress: "0x29299df74c285139B8701b1D1195Bd97FEc5C436",
    toAddress: "016810999 GTBANK",
    address: "0x1...76hg",
  },
  {
    id: "060..56dc",
    fullId: "060788900102115_ced65delhjs09ikjkjlh6890uduup",
    user: "Saga",
    time: "Jan 1, 2026 10:00",
    amount: "$20,000",
    gross: "$20,000.00",
    fee: "$5.00",
    netCredited: "$19,995.00",
    type: "Offramping",
    status: "Completed",
    fromUser: { name: "Saga Adekunle", isVerified: true },
    toUser: { name: "FBN", isVerified: true, type: "bank" },
    fromAddress: "0x30300eg85d396240C9812c2E2206Ce08Gfd6D547",
    toAddress: "032810888 FBN",
    address: "0x1...11jf",
  },
  {
    id: "090..12dcb",
    fullId: "090899011213226_dfe76efmitk10jlklkmi7901vevvq",
    user: "Bolatito",
    time: "Jan 1, 2026 16:42",
    amount: "$10,000",
    gross: "$10,000.00",
    fee: "$2.00",
    netCredited: "$9,998.00",
    type: "Offramping",
    status: "Completed",
    fromUser: { name: "Bolatito Ojo", isVerified: false },
    toUser: { name: "UBA", isVerified: true, type: "bank" },
    fromAddress: "0x41411fh96e407351D0923d3F3317Df19Hge7E658",
    toAddress: "043920777 UBA",
    address: "0g1...99df",
  },
  {
    id: "010..12dcb-5",
    fullId: "010455757583840_bec43bdjfhr87hghghfg4678sbsbo",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    gross: "$150,000.00",
    fee: "$10.00",
    netCredited: "$149,990.00",
    type: "Offramping",
    status: "Completed",
    fromUser: { name: "Blessing Jeremiah", isVerified: true },
    toUser: { name: "GTBANK", isVerified: true, type: "bank" },
    fromAddress: "0x19188ce63b174028A7690a0C9984Ac86EDb4B325",
    toAddress: "016810999 GTBANK",
    address: "0x1...36gf",
  },
  {
    id: "025..12deh-6",
    user: "Temitope",
    time: "Jan 1, 2026 02:04",
    amount: "$2m",
    type: "Deposit",
    status: "Failed",
    address: "0x1...76hg",
  },
  {
    id: "025..12deh-7",
    user: "Temitope",
    time: "Jan 1, 2026 02:04",
    amount: "$2m",
    type: "Deposit",
    status: "Failed",
    address: "0x1...76hg",
  },
  {
    id: "025..12deh-8",
    user: "Temitope",
    time: "Jan 1, 2026 02:04",
    amount: "$2m",
    type: "Deposit",
    status: "Failed",
    address: "0x1...76hg",
  },
  {
    id: "010..12dcb-9",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-10",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-11",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-12",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-13",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-14",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
  {
    id: "010..12dcb-15",
    user: "Idowu Blessing",
    time: "Jan 1, 2026 16:42",
    amount: "$150,000",
    type: "Offramping",
    status: "Completed",
    address: "0x1...36gf",
  },
];

export const DONUT_STATS = {
  total: "23,648",
  ongoing: "15,624",
  completed: "2,478",
  failed: "2,478",
};

// ─── Users ───────────────────────────────────────────────
export interface User {
  id: string; // e.g. "00001"
  firstName: string;
  lastName: string;
  country: string;
  kycStatus: "Pending" | "Verified" | "Rejected";
  walletAddress: string;
  dob: string;
  accountNumber: string;
  phone: string;
  fullWalletAddress: string;
}

export const USERS: User[] = [
  {
    id: "00001",
    firstName: "Idowu",
    lastName: "Blessing",
    country: "Nigeria",
    kycStatus: "Pending",
    walletAddress: "0x1...36gf",
    dob: "12-10-2005",
    accountNumber: "01234567891",
    phone: "+2349168104456",
    fullWalletAddress: "0x19188ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00002",
    firstName: "Idowu",
    lastName: "Blessing",
    country: "Nigeria",
    kycStatus: "Verified",
    walletAddress: "0x1...76hg",
    dob: "05-22-1998",
    accountNumber: "09876543210",
    phone: "+2348034561234",
    fullWalletAddress: "0x29199ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00003",
    firstName: "Saga",
    lastName: "Nwosu",
    country: "Nigeria",
    kycStatus: "Rejected",
    walletAddress: "0x1...11jf",
    dob: "03-15-2000",
    accountNumber: "11223344556",
    phone: "+2347055678901",
    fullWalletAddress: "0x39200ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00004",
    firstName: "Amira",
    lastName: "Eze",
    country: "Ghana",
    kycStatus: "Verified",
    walletAddress: "0x2...44ab",
    dob: "07-08-1995",
    accountNumber: "22334455667",
    phone: "+233244112233",
    fullWalletAddress: "0x49211ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00005",
    firstName: "Kwame",
    lastName: "Asante",
    country: "Ghana",
    kycStatus: "Pending",
    walletAddress: "0x3...55cd",
    dob: "11-30-1993",
    accountNumber: "33445566778",
    phone: "+233200445566",
    fullWalletAddress: "0x59222ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00006",
    firstName: "James",
    lastName: "Walker",
    country: "United States",
    kycStatus: "Verified",
    walletAddress: "0x4...67de",
    dob: "01-14-1990",
    accountNumber: "44556677889",
    phone: "+12025551234",
    fullWalletAddress: "0x69233ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00007",
    firstName: "Blessing",
    lastName: "Idowu",
    country: "Nigeria",
    kycStatus: "Verified",
    walletAddress: "0x5...78ef",
    dob: "09-25-2001",
    accountNumber: "55667788990",
    phone: "+2348076543210",
    fullWalletAddress: "0x79244ce63b174028A7690a0C9984Ac86EDb4B325",
  },
  {
    id: "00008",
    firstName: "Chidi",
    lastName: "Okoro",
    country: "Nigeria",
    kycStatus: "Rejected",
    walletAddress: "0x6...89fg",
    dob: "06-17-1997",
    accountNumber: "66778899001",
    phone: "+2349012345678",
    fullWalletAddress: "0x89255ce63b174028A7690a0C9984Ac86EDb4B325",
  },
];

export const USER_STATS: StatCard[] = [
  {
    name: "Total users",
    value: "100,000",
    change: "2.5%",
    isPositive: false,
    iconType: "users",
  },
  {
    name: "Active users",
    value: "2,000",
    change: "1.5%",
    isPositive: true,
    iconType: "users",
  },
  {
    name: "Verified users",
    value: "80,000",
    change: "12.5%",
    isPositive: true,
    iconType: "dollar",
  },
  {
    name: "Pending KYC",
    value: "20,000",
    change: "1.5%",
    isPositive: true,
    iconType: "wallet",
  },
];

export const USER_DEMOGRAPHY = {
  total: "10,000",
  breakdown: [
    { label: "Nigeria", value: "15,624", color: "#CB3CFF" },
    { label: "Ghana", value: "2,478", color: "#00DC1A" },
    { label: "United states", value: "2,478", color: "#FF0004" },
  ],
};
