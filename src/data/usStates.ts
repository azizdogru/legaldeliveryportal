export interface USState {
  code: string;
  name: string;
  slug: string;
  capital: string;
  courtSystemName: string;
  smallClaimsLimit: string;
}

export const US_STATES: USState[] = [
  { code: "AL", name: "Alabama", slug: "alabama", capital: "Montgomery", courtSystemName: "District Court of Alabama", smallClaimsLimit: "$6,000" },
  { code: "AK", name: "Alaska", slug: "alaska", capital: "Juneau", courtSystemName: "District Court of Alaska", smallClaimsLimit: "$10,000" },
  { code: "AZ", name: "Arizona", slug: "arizona", capital: "Phoenix", courtSystemName: "Justice Court of Arizona", smallClaimsLimit: "$3,500" },
  { code: "AR", name: "Arkansas", slug: "arkansas", capital: "Little Rock", courtSystemName: "District Court of Arkansas", smallClaimsLimit: "$5,000" },
  { code: "CA", name: "California", slug: "california", capital: "Sacramento", courtSystemName: "Superior Court of California", smallClaimsLimit: "$12,500" },
  { code: "CO", name: "Colorado", slug: "colorado", capital: "Denver", courtSystemName: "County Court of Colorado", smallClaimsLimit: "$7,500" },
  { code: "CT", name: "Connecticut", slug: "connecticut", capital: "Hartford", courtSystemName: "Superior Court of Connecticut", smallClaimsLimit: "$5,000" },
  { code: "DE", name: "Delaware", slug: "delaware", capital: "Dover", courtSystemName: "Justice of the Peace Court of Delaware", smallClaimsLimit: "$25,000" },
  { code: "DC", name: "District of Columbia", slug: "district-of-columbia", capital: "Washington", courtSystemName: "Superior Court of the District of Columbia", smallClaimsLimit: "$10,000" },
  { code: "FL", name: "Florida", slug: "florida", capital: "Tallahassee", courtSystemName: "County Court of Florida", smallClaimsLimit: "$8,000" },
  { code: "GA", name: "Georgia", slug: "georgia", capital: "Atlanta", courtSystemName: "Magistrate Court of Georgia", smallClaimsLimit: "$15,000" },
  { code: "HI", name: "Hawaii", slug: "hawaii", capital: "Honolulu", courtSystemName: "District Court of Hawaii", smallClaimsLimit: "$5,000" },
  { code: "ID", name: "Idaho", slug: "idaho", capital: "Boise", courtSystemName: "Magistrate Division of Idaho", smallClaimsLimit: "$5,000" },
  { code: "IL", name: "Illinois", slug: "illinois", capital: "Springfield", courtSystemName: "Circuit Court of Illinois", smallClaimsLimit: "$10,000" },
  { code: "IN", name: "Indiana", slug: "indiana", capital: "Indianapolis", courtSystemName: "Small Claims Court of Indiana", smallClaimsLimit: "$10,000" },
  { code: "IA", name: "Iowa", slug: "iowa", capital: "Des Moines", courtSystemName: "District Court of Iowa", smallClaimsLimit: "$6,500" },
  { code: "KS", name: "Kansas", slug: "kansas", capital: "Topeka", courtSystemName: "District Court of Kansas", smallClaimsLimit: "$4,000" },
  { code: "KY", name: "Kentucky", slug: "kentucky", capital: "Frankfort", courtSystemName: "District Court of Kentucky", smallClaimsLimit: "$2,500" },
  { code: "LA", name: "Louisiana", slug: "louisiana", capital: "Baton Rouge", courtSystemName: "City Court or Justice of the Peace of Louisiana", smallClaimsLimit: "$5,000" },
  { code: "ME", name: "Maine", slug: "maine", capital: "Augusta", courtSystemName: "District Court of Maine", smallClaimsLimit: "$6,000" },
  { code: "MD", name: "Maryland", slug: "maryland", capital: "Annapolis", courtSystemName: "District Court of Maryland", smallClaimsLimit: "$5,000" },
  { code: "MA", name: "Massachusetts", slug: "massachusetts", capital: "Boston", courtSystemName: "District Court of Massachusetts", smallClaimsLimit: "$7,000" },
  { code: "MI", name: "Michigan", slug: "michigan", capital: "Lansing", courtSystemName: "District Court of Michigan", smallClaimsLimit: "$7,000" },
  { code: "MN", name: "Minnesota", slug: "minnesota", capital: "Saint Paul", courtSystemName: "Conciliation Court of Minnesota", smallClaimsLimit: "$15,000" },
  { code: "MS", name: "Mississippi", slug: "mississippi", capital: "Jackson", courtSystemName: "Justice Court of Mississippi", smallClaimsLimit: "$3,500" },
  { code: "MO", name: "Missouri", slug: "missouri", capital: "Jefferson City", courtSystemName: "Circuit Court of Missouri", smallClaimsLimit: "$5,000" },
  { code: "MT", name: "Montana", slug: "montana", capital: "Helena", courtSystemName: "Justice Court of Montana", smallClaimsLimit: "$7,000" },
  { code: "NE", name: "Nebraska", slug: "nebraska", capital: "Lincoln", courtSystemName: "County Court of Nebraska", smallClaimsLimit: "$3,900" },
  { code: "NV", name: "Nevada", slug: "nevada", capital: "Carson City", courtSystemName: "Justice Court of Nevada", smallClaimsLimit: "$10,000" },
  { code: "NH", name: "New Hampshire", slug: "new-hampshire", capital: "Concord", courtSystemName: "Circuit Court District Division of New Hampshire", smallClaimsLimit: "$10,000" },
  { code: "NJ", name: "New Jersey", slug: "new-jersey", capital: "Trenton", courtSystemName: "Superior Court Special Civil Part of New Jersey", smallClaimsLimit: "$5,000" },
  { code: "NM", name: "New Mexico", slug: "new-mexico", capital: "Santa Fe", courtSystemName: "Magistrate Court of New Mexico", smallClaimsLimit: "$10,000" },
  { code: "NY", name: "New York", slug: "new-york", capital: "Albany", courtSystemName: "Civil Court / Town and Village Court of New York", smallClaimsLimit: "$10,000" },
  { code: "NC", name: "North Carolina", slug: "north-carolina", capital: "Raleigh", courtSystemName: "Small Claims District Court of North Carolina", smallClaimsLimit: "$10,000" },
  { code: "ND", name: "North Dakota", slug: "north-dakota", capital: "Bismarck", courtSystemName: "District Court of North Dakota", smallClaimsLimit: "$15,000" },
  { code: "OH", name: "Ohio", slug: "ohio", capital: "Columbus", courtSystemName: "Municipal Court of Ohio", smallClaimsLimit: "$6,000" },
  { code: "OK", name: "Oklahoma", slug: "oklahoma", capital: "Oklahoma City", courtSystemName: "District Court Small Claims Division of Oklahoma", smallClaimsLimit: "$10,000" },
  { code: "OR", name: "Oregon", slug: "oregon", capital: "Salem", courtSystemName: "Circuit Court of Oregon", smallClaimsLimit: "$10,000" },
  { code: "PA", name: "Pennsylvania", slug: "pennsylvania", capital: "Harrisburg", courtSystemName: "Magisterial District Court of Pennsylvania", smallClaimsLimit: "$12,000" },
  { code: "RI", name: "Rhode Island", slug: "rhode-island", capital: "Providence", courtSystemName: "District Court of Rhode Island", smallClaimsLimit: "$2,500" },
  { code: "SC", name: "South Carolina", slug: "south-carolina", capital: "Columbia", courtSystemName: "Magistrate Court of South Carolina", smallClaimsLimit: "$7,500" },
  { code: "SD", name: "South Dakota", slug: "south-dakota", capital: "Pierre", courtSystemName: "Magistrate Court of South Dakota", smallClaimsLimit: "$12,000" },
  { code: "TN", name: "Tennessee", slug: "tennessee", capital: "Nashville", courtSystemName: "General Sessions Court of Tennessee", smallClaimsLimit: "$25,000" },
  { code: "TX", name: "Texas", slug: "texas", capital: "Austin", courtSystemName: "Justice of the Peace Court of Texas", smallClaimsLimit: "$20,000" },
  { code: "UT", name: "Utah", slug: "utah", capital: "Salt Lake City", courtSystemName: "Justice Court of Utah", smallClaimsLimit: "$15,000" },
  { code: "VT", name: "Vermont", slug: "vermont", capital: "Montpelier", courtSystemName: "Superior Court Civil Division of Vermont", smallClaimsLimit: "$5,000" },
  { code: "VA", name: "Virginia", slug: "virginia", capital: "Richmond", courtSystemName: "General District Court of Virginia", smallClaimsLimit: "$5,000" },
  { code: "WA", name: "Washington", slug: "washington", capital: "Olympia", courtSystemName: "District Court of Washington", smallClaimsLimit: "$10,000" },
  { code: "WV", name: "West Virginia", slug: "west-virginia", capital: "Charleston", courtSystemName: "Magistrate Court of West Virginia", smallClaimsLimit: "$10,000" },
  { code: "WI", name: "Wisconsin", slug: "wisconsin", capital: "Madison", courtSystemName: "Circuit Court of Wisconsin", smallClaimsLimit: "$10,000" },
  { code: "WY", name: "Wyoming", slug: "wyoming", capital: "Cheyenne", courtSystemName: "Circuit Court of Wyoming", smallClaimsLimit: "$6,000" },
];

export function getStateByCode(code: string): USState | undefined {
  return US_STATES.find((s) => s.code.toUpperCase() === code.toUpperCase());
}

export function getStateBySlug(slug: string): USState | undefined {
  return US_STATES.find((s) => s.slug.toLowerCase() === slug.toLowerCase() || s.code.toLowerCase() === slug.toLowerCase());
}
