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

const RAW: RawAC[][] = [
  // Mumbai South — MVA leaning historically, but VS swung
  [
    { n: 187, name: "Colaba",      pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",49.8, 4200, 49.3],
      vs: ["Mahayuti","BJP","Rahul Narwekar", 54.2, 16100, 51.7] },
    { n: 186, name: "Mumbadevi",   pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",58.1, 12400, 51.2],
      vs: ["MVA","INC","Amin Patel", 55.4, 14800, 49.1] },
    { n: 185, name: "Malabar Hill",pc: "Mumbai South",
      ls: ["Mahayuti","BJP","Yamini Jadhav",51.7, 6800, 47.8],
      vs: ["Mahayuti","BJP","Mangal Prabhat Lodha", 64.3, 28900, 50.4] },
    { n: 184, name: "Byculla",     pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",54.6, 9200, 52.4],
      vs: ["Mahayuti","SHS","Manoj Jamsutkar", 47.8, 4100, 50.1] },
    { n: 183, name: "Shivadi",     pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",56.3, 10800, 53.8],
      vs: ["MVA","SS(UBT)","Ajay Choudhari", 51.2, 7600, 51.4] },
    { n: 182, name: "Worli",       pc: "Mumbai South",
      ls: ["MVA","SS(UBT)","Arvind Sawant",52.4, 6400, 54.2],
      vs: ["MVA","SS(UBT)","Aaditya Thackeray", 48.1, 8200, 52.1] },
  ],
  // Mumbai South Central — MVA won LS, mixed VS
  [
    { n: 181, name: "Mahim",            pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",53.2, 8900, 52.7],
      vs: ["Mahayuti","SHS","Sada Sarvankar", 41.5, 1300, 51.0] },
    { n: 180, name: "Wadala",           pc: "Mumbai South Central",
      ls: ["Mahayuti","SHS","Rahul Shewale",50.6, 4200, 51.4],
      vs: ["Mahayuti","BJP","Kalidas Kolambkar", 58.7, 19200, 52.2] },
    { n: 179, name: "Sion Koliwada",    pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",51.8, 5400, 50.1],
      vs: ["Mahayuti","BJP","Captain R Tamil Selvan", 49.6, 6900, 49.8] },
    { n: 178, name: "Dharavi",          pc: "Mumbai South Central",
      ls: ["MVA","INC","Varsha Gaikwad",62.4, 22100, 54.9],
      vs: ["MVA","INC","Jyoti Gaikwad", 58.9, 24300, 52.8] },
    { n: 173, name: "Chembur",          pc: "Mumbai South Central",
      ls: ["MVA","SS(UBT)","Anil Desai",52.7, 7100, 53.5],
      vs: ["Mahayuti","SHS","Tukaram Kate", 46.3, 3800, 51.6] },
    { n: 172, name: "Anushakti Nagar",  pc: "Mumbai South Central",
      ls: ["MVA","NCP(SP)","Anil Desai",54.1, 8300, 50.2],
      vs: ["Mahayuti","NCP","Sana Malik", 47.5, 4400, 48.9] },
  ],
  // Mumbai North Central — VS swept by Mahayuti
  [
    { n: 177, name: "Vandre West",  pc: "Mumbai North Central",
      ls: ["Mahayuti","BJP","Ujjwal Nikam",52.8, 7400, 51.2],
      vs: ["Mahayuti","BJP","Ashish Shelar", 61.4, 22800, 50.1] },
    { n: 176, name: "Vandre East",  pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",51.6, 5200, 50.8],
      vs: ["Mahayuti","SHS","Varun Sardesai (rival)", 44.2, 1200, 49.9] },
    { n: 175, name: "Kalina",       pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",53.4, 7800, 51.7],
      vs: ["Mahayuti","SHS","Amit Satam", 49.7, 9600, 50.4] },
    { n: 174, name: "Kurla",        pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",55.1, 9400, 52.6],
      vs: ["Mahayuti","SHS","Mangesh Kudalkar", 46.9, 4200, 50.8] },
    { n: 168, name: "Chandivali",   pc: "Mumbai North Central",
      ls: ["MVA","INC","Varsha Gaikwad",54.7, 8700, 53.1],
      vs: ["Mahayuti","SHS","Dilip Lande", 48.4, 6100, 51.7] },
    { n: 167, name: "Vile Parle",   pc: "Mumbai North Central",
      ls: ["Mahayuti","BJP","Ujjwal Nikam",55.9, 11200, 52.4],
      vs: ["Mahayuti","BJP","Parag Alavani", 67.2, 32400, 51.8] },
  ],
  // Mumbai North East
  [
    { n: 171, name: "Mankhurd Shivaji Nagar", pc: "Mumbai North East",
      ls: ["MVA","NCP(SP)","Sanjay Dina Patil",61.3, 18900, 50.4],
      vs: ["MVA","NCP(SP)","Abu Asim Azmi (SP-MVA)", 52.1, 11700, 48.6] },
    { n: 170, name: "Ghatkopar East", pc: "Mumbai North East",
      ls: ["Mahayuti","BJP","Mihir Kotecha",54.7, 9100, 52.3],
      vs: ["Mahayuti","BJP","Parag Shah", 71.4, 41800, 51.9] },
    { n: 169, name: "Ghatkopar West", pc: "Mumbai North East",
      ls: ["Mahayuti","BJP","Mihir Kotecha",52.4, 6300, 51.8],
      vs: ["Mahayuti","BJP","Ram Kadam", 62.8, 24600, 50.7] },
    { n: 157, name: "Bhandup West",   pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",51.7, 4900, 53.2],
      vs: ["Mahayuti","SHS","Ashok Patil", 47.3, 3700, 51.4] },
    { n: 156, name: "Vikhroli",       pc: "Mumbai North East",
      ls: ["MVA","SS(UBT)","Sanjay Dina Patil",53.9, 7600, 52.8],
      vs: ["MVA","SS(UBT)","Sunil Raut", 50.4, 6900, 50.6] },
    { n: 155, name: "Mulund",         pc: "Mumbai North East",
      ls: ["Mahayuti","BJP","Mihir Kotecha",58.2, 14800, 52.1],
      vs: ["Mahayuti","BJP","Mihir Kotecha", 68.7, 38200, 50.9] },
  ],
  // Mumbai North West
  [
    { n: 166, name: "Andheri East",  pc: "Mumbai North West",
      ls: ["MVA","SS(UBT)","Amol Kirtikar",52.1, 5800, 51.4],
      vs: ["Mahayuti","SHS","Murji Patel", 47.8, 5200, 49.8] },
    { n: 165, name: "Andheri West",  pc: "Mumbai North West",
      ls: ["MVA","SS(UBT)","Amol Kirtikar",51.4, 4600, 50.8],
      vs: ["Mahayuti","BJP","Ameet Satam", 53.6, 13400, 50.2] },
    { n: 164, name: "Versova",       pc: "Mumbai North West",
      ls: ["Mahayuti","SHS","Ravindra Waikar",50.9, 1900, 51.2],
      vs: ["Mahayuti","BJP","Haroon Khan (rival)", 49.1, 6800, 50.4] },
    { n: 163, name: "Goregaon",      pc: "Mumbai North West",
      ls: ["MVA","SS(UBT)","Amol Kirtikar",52.6, 6100, 52.7],
      vs: ["Mahayuti","BJP","Vidya Thakur", 51.8, 9800, 51.1] },
    { n: 159, name: "Dindoshi",      pc: "Mumbai North West",
      ls: ["MVA","SS(UBT)","Amol Kirtikar",54.3, 8400, 53.2],
      vs: ["MVA","SS(UBT)","Sunil Prabhu", 49.6, 6300, 51.6] },
    { n: 158, name: "Jogeshwari East",pc: "Mumbai North West",
      ls: ["MVA","SS(UBT)","Amol Kirtikar",53.8, 7200, 52.4],
      vs: ["Mahayuti","SHS","Anant Nar (rival)", 48.7, 5400, 50.8] },
  ],
  // Mumbai North — BJP stronghold both cycles
  [
    { n: 162, name: "Malad West",    pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",55.8, 11200, 52.4],
      vs: ["MVA","INC","Aslam Shaikh", 50.7, 6900, 51.3] },
    { n: 161, name: "Charkop",       pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",61.2, 19400, 53.1],
      vs: ["Mahayuti","BJP","Yogesh Sagar", 68.4, 34600, 51.9] },
    { n: 160, name: "Kandivali East",pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",62.8, 22100, 52.8],
      vs: ["Mahayuti","BJP","Atul Bhatkhalkar", 67.1, 31800, 51.4] },
    { n: 154, name: "Magathane",     pc: "Mumbai North",
      ls: ["Mahayuti","SHS","Piyush Goyal",53.4, 7800, 51.6],
      vs: ["Mahayuti","SHS","Prakash Surve", 58.9, 17400, 50.8] },
    { n: 153, name: "Dahisar",       pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",56.7, 12400, 52.2],
      vs: ["Mahayuti","BJP","Manisha Choudhary", 63.4, 24800, 50.9] },
    { n: 152, name: "Borivali",      pc: "Mumbai North",
      ls: ["Mahayuti","BJP","Piyush Goyal",65.3, 26800, 53.4],
      vs: ["Mahayuti","BJP","Sanjay Upadhyay", 73.2, 48600, 52.1] },
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
