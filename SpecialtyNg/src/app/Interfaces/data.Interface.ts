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
