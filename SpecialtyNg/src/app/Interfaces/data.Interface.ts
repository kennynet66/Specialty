export interface allIndustriesResponse {
  industries: [
    {
      industryId: string,
      industryName: string,
      industryImage: string
    }
  ]
}

export interface Industry {
  industryId: string,
  industryName: string,
  industryImage: string
}

export interface updateUserDetails {
  gender: string,
  DOB: string,
  about: string
  country: string,
  city: string,
  phoneNumber: string,
  bankAcNo: number,
  industry: string,
  bankAcName: string
}

export interface countriesApiResponse {
  // countries: [
  //   {
      id: number,
      name: string,
      iso2: string
  //   }
  // ]
}
