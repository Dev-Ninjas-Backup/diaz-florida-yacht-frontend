import icon1 from '@/assets/seller-dashboard/myListing/icon1.svg';
import icon2 from '@/assets/seller-dashboard/myListing/icon2.svg';
import icon3 from '@/assets/seller-dashboard/myListing/icon3.svg';

type InvoiceStatus = 'Complete' | 'Failed';

export type InvoiceRecord = {
  invoice_id: string;
  image: string;
  Name: string;
  charge: string;
  date: string;
  status: InvoiceStatus;
};

export const inoviceData: InvoiceRecord[] = [
  {
    invoice_id: 'INV619253',
    image: icon1.src,
    Name: '2007 Hatteras 64 Convertible',
    charge: '$19.99',
    date: '09/07/2025',
    status: 'Complete',
  },
  {
    invoice_id: 'INV967315',
    image: icon2.src,
    Name: '2018 Azimut 60 Flybridge',
    charge: '$19.99',
    date: '14/07/2025',
    status: 'Complete',
  },
  {
    invoice_id: 'INV432030',
    image: icon3.src,
    Name: '2018 Azimut 60 Flybridge',
    charge: '$19.99',
    date: '15/07/2025',
    status: 'Complete',
  },
  {
    invoice_id: 'INV618987',
    image: icon1.src,
    Name: '2007 Hatteras 64 Convertible',
    charge: '$19.99',
    date: '18/07/2025',
    status: 'Failed',
  },
  {
    invoice_id: 'INV648710',
    image: icon2.src,
    Name: '2018 Azimut 60 Flybridge',
    charge: '$19.99',
    date: '20/07/2025',
    status: 'Complete',
  },
  {
    invoice_id: 'INV607440',
    image: icon3.src,
    Name: '2018 Azimut 60 Flybridge',
    charge: '$19.99',
    date: '27/07/2025',
    status: 'Complete',
  },
];
