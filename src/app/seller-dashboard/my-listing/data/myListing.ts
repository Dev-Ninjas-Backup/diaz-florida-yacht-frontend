import icon1 from "@/assets/seller-dashboard/myListing/icon1.svg"
import icon2 from "@/assets/seller-dashboard/myListing/icon2.svg"
import icon3 from "@/assets/seller-dashboard/myListing/icon3.svg"

export interface IListing {
  "Listing ID": string;
  image:string;
  Name: string;
  Price: string;
  "Publish Date": string; 
  Status: "Active" | "Closed"; 
}

export const myListingsData : IListing[]=[
  {
    "Listing ID": "RF651011",
    image:icon1.src,
    "Name": "2007 Hatteras 64 Convertible",
    "Price": "$1,195,000",
    "Publish Date": "09/07/2025",
    "Status": "Active"
  },
  {
    "Listing ID": "RF651011",
    image:icon2.src,
    "Name": "2018 Azimut 60 Flybridge",
    "Price": "$1,195,000",
    "Publish Date": "14/07/2025",
    "Status": "Closed"
  },
  {
    "Listing ID": "RF651011",
    image:icon3.src,
    "Name": "2018 Azimut 60 Flybridge",
    "Price": "$1,195,000",
    "Publish Date": "15/07/2025",
    "Status": "Active"
  },
  {
    "Listing ID": "RF651011",
    image:icon1.src,
    "Name": "2007 Hatteras 64 Convertible",
    "Price": "$1,195,000",
    "Publish Date": "18/07/2025",
    "Status": "Active"
  },
  {
    "Listing ID": "RF651011",
    image:icon2.src,
    "Name": "2018 Azimut 60 Flybridge",
    "Price": "$1,195,000",
    "Publish Date": "20/07/2025",
    "Status": "Closed"
  },
  {
    "Listing ID": "RF651011",
    image:icon3.src,
    "Name": "2018 Azimut 60 Flybridge",
    "Price": "$1,195,000",
    "Publish Date": "27/07/2025",
    "Status": "Active"
  }
]