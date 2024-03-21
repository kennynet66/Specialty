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
  id: number,
  name: string,
  iso2: string
}

export interface allSpecialistsResponse {
  specialists: [
    {
      userId: string,
      fullName: string,
      profileImg: string
      email: string,
      gender: string,
      about: string,
      industryName: string,
      rate: number
    }
  ]
}

export interface Specialist {
  userId: string,
  profileImg: string
  email: string,
  gender: string,
  about: string,
  fullName: string,
  industryName: string
  rate: number
}