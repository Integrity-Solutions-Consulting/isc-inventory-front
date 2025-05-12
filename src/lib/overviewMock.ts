export const DATAGENERAL = [
  { title: 'Total orders', amount: '57', percentage: '7.32%', isProfit: true },
  {
    title: 'Total gross',
    amount: '$30.245',
    percentage: '7.32%',
    isProfit: true,
  },
  {
    title: 'Total net',
    amount: '$9.841',
    percentage: '7.32%',
    isProfit: false,
  },
  {
    title: 'Average Order',
    amount: '$367.19',
    percentage: '7.32%',
    isProfit: true,
  },
];

export const DATAGAS = [
  { title: 'Active', amount: '57', percentage: '7.32%', isProfit: true },
  { title: 'Banned', amount: '5', percentage: '7.32%', isProfit: true },
];

export const DATADRIVER = [
  { title: 'Active', amount: '57', percentage: '7.32%', isProfit: true },
  { title: 'Pending', amount: '13', percentage: '7.32%', isProfit: false },
  { title: 'Banned', amount: '4', percentage: '7.32%', isProfit: true },
];

export const DATARETAIL = [
  { title: 'Active', amount: '57', percentage: '7.32%', isProfit: false },
  { title: 'Pending', amount: '13', percentage: '7.32%', isProfit: true },
  { title: 'Banned', amount: '4', percentage: '7.32%', isProfit: true },
];

export const DATAADMIN = [
  { title: 'Active', amount: '57', percentage: '7.32%', isProfit: true },
  { title: 'Banned', amount: '4', percentage: '7.32%', isProfit: true },
];

export const CHARTTODAY = [
  { label: 'Today', captured: 186, authorized: 100, refunded: 80 },
  { label: 'Yesterday', captured: 305, authorized: 160, refunded: 60 },
];

export const CHARTWEEK = [
  { label: 'Sat', captured: 886, authorized: 800, refunded: 80, voided: 300 },
  { label: 'Sun', captured: 705, authorized: 760, refunded: 60, voided: 300 },
  { label: 'Mon', captured: 686, authorized: 600, refunded: 80, voided: 300 },
  { label: 'Tue', captured: 505, authorized: 560, refunded: 60, voided: 300 },
  { label: 'Wed', captured: 486, authorized: 400, refunded: 80, voided: 300 },
  { label: 'Thu', captured: 305, authorized: 360, refunded: 60, voided: 300 },
  { label: 'Fri', captured: 286, authorized: 200, refunded: 80, voided: 300 },
];

//? PAYROLL MOCKs

export const TABLEPAYMENT = {
  tableHead: [
    { label: 'Reference', style: '' },
    { label: 'Sense', style: '' },
    { label: 'Beneficiary', style: '' },
    { label: 'Transaction', style: 'text-right' },
  ],
  tableBody: [
    {
      reference: '01',
      sense: {
        fullName: 'Yepeto Flores',
        role: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      beneficiary: {
        fullName: 'Yepeto Flores',
        role: 'Drivers',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      transaction: {
        amount: '$250.00',
        transactionDate: 'April 16, 2025 2:31 pm',
      },
    },
    {
      reference: '02',
      sense: {
        fullName: 'Yepeto Flores',
        role: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      beneficiary: {
        fullName: 'Yepeto Flores',
        role: 'Retailer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      transaction: {
        amount: '$250.00',
        transactionDate: 'April 16, 2025 2:31 pm',
      },
    },
    {
      reference: '03',
      sense: {
        fullName: 'Yepeto Flores',
        role: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      beneficiary: {
        fullName: 'Yepeto Flores',
        role: 'User',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      transaction: {
        amount: '$250.00',
        transactionDate: 'April 16, 2025 2:31 pm',
      },
    },
    {
      reference: '04',
      sense: {
        fullName: 'Yepeto Flores',
        role: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      beneficiary: {
        fullName: 'Yepeto Flores',
        role: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRAlpUwgnA01Ksosn99mzvGi1dZEeLS0Mw&s',
      },
      transaction: {
        amount: '$250.00',
        transactionDate: 'April 16, 2025 2:31 pm',
      },
    },
  ],
};

export const CHARTDATAPAYROLL = [
  { label: 'January', zelle: 186, wireTransfer: 80, dots: 90 },
  { label: 'February', zelle: 305, wireTransfer: 200, dots: 10 },
  { label: 'March', zelle: 237, wireTransfer: 120, dots: 80 },
  { label: 'April', zelle: 73, wireTransfer: 190, dots: 50 },
  { label: 'May', zelle: 209, wireTransfer: 130, dots: 45 },
  { label: 'June', zelle: 214, wireTransfer: 140, dots: 20 },
];

export const CHARTCONFIGGLOBALPAYROLL = {
  zelle: {
    label: 'Flash Admins',
    color: '#a855f7',
  },
  wireTransfer: {
    label: 'Flash Drivers',
    color: '#3b82f6',
  },
  dots: {
    label: 'Flash Retailers',
    color: '#22c55e',
  },
};
