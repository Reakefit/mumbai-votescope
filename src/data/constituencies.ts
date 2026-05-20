// Mock 2024 Lok Sabha vs Vidhan Sabha data for Mumbai's 6 PCs / 36 ACs.
// Values are illustrative, calibrated to reproduce the known macro pattern:
// MVA stronger in LS, Mahayuti sweep in VS, with several split-ticket ACs.

export type Alliance = "MVA" | "Mahayuti";
export type Party =
  | "BJP" | "SHS" | "NCP"
  | "INC" | "SS(UBT)" | "NCP(SP)";

export const ALLIANCE_OF: Record<Party, Alliance> = {
  BJP: "Mahayuti", SHS: "Mahayuti", NCP: "Mahayuti",
  INC: "MVA", "SS(UBT)": "MVA", "NCP(SP)": "MVA",
};

export interface CycleResult {
  winning_alliance: Alliance;
  winning_party: Party;
  candidate: string;
  vote_share_pct: number;
  margin_votes: number;
  turnout_pct: number;
}

export interface AC {
  ac_number: number;
  ac_name: string;
  parent_pc: string;
  pc_slug: string;
  // grid coords for cartogram (col 0..5, row 0..5 with 0=south)
  col: number;
  row: number;
  lok_sabha_2024: CycleResult;
  vidhan_sabha_2024: CycleResult;
  metrics: {
    alliance_split_ticket: boolean;
    vote_share_swing_pct: number;
    turnout_delta_pct: number;
  };
}

export const PC_LIST = [
  { name: "Mumbai South",        slug: "mumbai-south",         row: 0 },
  { name: "Mumbai South Central",slug: "mumbai-south-central", row: 1 },
  { name: "Mumbai North Central",slug: "mumbai-north-central", row: 2 },
  { name: "Mumbai North East",   slug: "mumbai-north-east",    row: 3 },
  { name: "Mumbai North West",   slug: "mumbai-north-west",    row: 4 },
  { name: "Mumbai North",        slug: "mumbai-north",         row: 5 },
] as const;

interface RawAC {
  n: number; name: string; pc: string;
  ls: [Alliance, Party, string, number, number, number];
  vs: [Alliance, Party, string, number, number, number];
}

// Real 2024 results: LS per parent PC and VS per AC parsed from Wikipedia.
// Turnout: LS per-PC actual; VS uses district turnout (Mumbai City 52.65 / Suburban 56.39) as AC proxy.
const RAW: RawAC[][] = [
  [
    { n: 187, name: "Colaba", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["Mahayuti","BJP","Rahul Narwekar",68.49,48581,52.65] },
    { n: 186, name: "Mumbadevi", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["MVA","INC","Amin Patel",63.34,34844,52.65] },
    { n: 185, name: "Malabar Hill", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["Mahayuti","BJP","Mangal Lodha",73.38,68019,52.65] },
    { n: 184, name: "Byculla", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["MVA","SS(UBT)","Manoj Jamsutkar",58.09,31361,52.65] },
    { n: 183, name: "Shivadi", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["MVA","SS(UBT)","Ajay Choudhari",48.72,7140,52.65] },
    { n: 182, name: "Worli", pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",51.18,52673,50.33],
      vs: ["MVA","SS(UBT)","Aaditya Thackeray",44.19,8801,52.65] },
  ],
  [
    { n: 181, name: "Mahim", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["MVA","SS(UBT)","Mahesh Sawant",37.31,1316,52.65] },
    { n: 180, name: "Wadala", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["Mahayuti","BJP","Kalidas Kolambkar",55.78,24973,52.65] },
    { n: 179, name: "Sion Koliwada", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["Mahayuti","BJP","R. Tamil Selvan",48.25,7895,52.65] },
    { n: 178, name: "Dharavi", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["MVA","INC","Jyoti Gaikwad",53.87,23459,52.65] },
    { n: 173, name: "Chembur", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["Mahayuti","SHS","Tukaram Ramkrishna Kate|Tukaram Kate",44.18,10711,52.65] },
    { n: 172, name: "Anushakti Nagar", pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",49.73,53384,53.9],
      vs: ["Mahayuti","NCP","Sana Malik",33.78,3378,52.65] },
  ],
  [
    { n: 177, name: "Vandre West", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["Mahayuti","BJP","Ashish Shelar",55.51,19931,56.39] },
    { n: 176, name: "Vandre East", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["MVA","SS(UBT)","Varun Sardesai",42.26,11365,56.39] },
    { n: 175, name: "Kalina", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["MVA","SS(UBT)","Sanjay Potnis",46.79,5008,56.39] },
    { n: 174, name: "Kurla", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["Mahayuti","SHS","Mangesh Kudalkar",46.56,4187,56.39] },
    { n: 168, name: "Chandivali", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["Mahayuti","SHS","Dilip Lande",51.9,20625,56.39] },
    { n: 167, name: "Vile Parle", pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",48.93,16514,52.21],
      vs: ["Mahayuti","BJP","Parag Alavani",61.7,54935,56.39] },
  ],
  [
    { n: 171, name: "Mankhurd Shivaji Nagar", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["MVA","NCP(SP)","Abu Azmi",31.38,12753,56.39] },
    { n: 170, name: "Ghatkopar East", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["Mahayuti","BJP","Parag Shah",57.12,34999,56.39] },
    { n: 169, name: "Ghatkopar West", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["Mahayuti","BJP","Ram Kadam",43.75,12971,56.39] },
    { n: 157, name: "Bhandup West", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["Mahayuti","SHS","Ashok Patil",42.74,6764,56.39] },
    { n: 156, name: "Vikhroli", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["MVA","SS(UBT)","Sunil Raut",46.86,15526,56.39] },
    { n: 155, name: "Mulund", pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",48.67,29861,56.63],
      vs: ["Mahayuti","BJP","Mihir Kotecha",71.78,90032,56.39] },
  ],
  [
    { n: 166, name: "Andheri East", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["Mahayuti","SHS","Murji Patel",55.66,25486,56.39] },
    { n: 165, name: "Andheri West", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["Mahayuti","BJP","Ameet Bhaskar Satam|Ameet Satam",54.75,19599,56.39] },
    { n: 164, name: "Versova", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["MVA","SS(UBT)","Haroon Khan (Maharashtra politician)|Haroon Rashid Khan",44.21,1600,56.39] },
    { n: 163, name: "Goregaon", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["Mahayuti","BJP","Vidya Thakur",52.39,23600,56.39] },
    { n: 159, name: "Dindoshi", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["MVA","SS(UBT)","Sunil Prabhu",43.03,6182,56.39] },
    { n: 158, name: "Jogeshwari East", pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",47.4,48,55.04],
      vs: ["MVA","SS(UBT)","Anant Nar",43.32,1541,56.39] },
  ],
  [
    { n: 162, name: "Malad West", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["MVA","INC","Aslam Shaikh",49.81,6227,56.39] },
    { n: 161, name: "Charkop", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["Mahayuti","BJP","Yogesh Sagar",69.44,91154,56.39] },
    { n: 160, name: "Kandivali East", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["Mahayuti","BJP","Atul Bhatkhalkar",72.39,83593,56.39] },
    { n: 154, name: "Magathane", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["Mahayuti","SHS","Prakash Surve",58.15,58164,56.39] },
    { n: 153, name: "Dahisar", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["Mahayuti","BJP","Manisha Ashok Chaudhary|Manisha Chaudhary",60.64,44329,56.39] },
    { n: 152, name: "Borivali", pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.68,357608,57.2],
      vs: ["Mahayuti","BJP","Sanjay Upadhyay",68.57,100257,56.39] },
  ],
];

function pcSlug(pc: string) { return PC_LIST.find(p => p.name === pc)!.slug; }
function pcRow(pc: string) { return PC_LIST.find(p => p.name === pc)!.row; }

export const ACS: AC[] = RAW.flatMap((row, rowIdx) =>
  row.map((r, colIdx) => {
    const ls: CycleResult = {
      winning_alliance: r.ls[0], winning_party: r.ls[1], candidate: r.ls[2],
      vote_share_pct: r.ls[3], margin_votes: r.ls[4], turnout_pct: r.ls[5],
    };
    const vs: CycleResult = {
      winning_alliance: r.vs[0], winning_party: r.vs[1], candidate: r.vs[2],
      vote_share_pct: r.vs[3], margin_votes: r.vs[4], turnout_pct: r.vs[5],
    };
    return {
      ac_number: r.n, ac_name: r.name, parent_pc: r.pc, pc_slug: pcSlug(r.pc),
      col: colIdx, row: pcRow(r.pc),
      lok_sabha_2024: ls, vidhan_sabha_2024: vs,
      metrics: {
        alliance_split_ticket: ls.winning_alliance !== vs.winning_alliance,
        vote_share_swing_pct: +(vs.vote_share_pct - ls.vote_share_pct).toFixed(1),
        turnout_delta_pct: +(vs.turnout_pct - ls.turnout_pct).toFixed(1),
      },
    };
  })
);

export function aggregateSeats(cycle: "ls" | "vs", acs: AC[] = ACS) {
  const key = cycle === "ls" ? "lok_sabha_2024" : "vidhan_sabha_2024";
  let mva = 0, mahayuti = 0;
  for (const a of acs) {
    if (a[key].winning_alliance === "MVA") mva++; else mahayuti++;
  }
  return { mva, mahayuti };
}

export function filterByPC(slug: string | null): AC[] {
  if (!slug || slug === "all") return ACS;
  return ACS.filter(a => a.pc_slug === slug);
}