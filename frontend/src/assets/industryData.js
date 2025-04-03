const industryData= [
    {
        "id": 1,
        "industry_name": "ACCOUNTING \/ ACCOUNTANT FIRM",
        "main_category": 0
    },
    {
        "id": 2,
        "industry_name": "CA, Chartered Accountant Firm \/ CPA, Public Accounting Firm",
        "main_category": 1
    },
    {
        "id": 3,
        "industry_name": "CWA - CMA, Cost & Management Accountant Firm",
        "main_category": 1
    },
    {
        "id": 4,
        "industry_name": "Accounting BPO \/ Bookkeeping & Accountancy",
        "main_category": 1
    },
    {
        "id": 5,
        "industry_name": "Audit \/ Forensic Accounting Firm",
        "main_category": 1
    },
    {
        "id": 6,
        "industry_name": "Taxation Firm \/ Taxation BPO",
        "main_category": 1
    },
    {
        "id": 7,
        "industry_name": "ADVERTISING \/ PUBLIC RELATIONS \/ MARKETING \/ EVENTS",
        "main_category": 0
    },
    {
        "id": 8,
        "industry_name": "Advertising (Digital \/ Electronic \/ Print \/ Outdoor - OOH)",
        "main_category": 7
    },
    {
        "id": 9,
        "industry_name": "Market Research Firms",
        "main_category": 7
    },
    {
        "id": 10,
        "industry_name": "PR, Public Relations \/ Investor Relations",
        "main_category": 7
    },
    {
        "id": 11,
        "industry_name": "Marketing Communications \/ Corporate Communications",
        "main_category": 7
    },
    {
        "id": 12,
        "industry_name": "Strategic Marketing Consulting \/ Digital Marketing Firms",
        "main_category": 7
    },
    {
        "id": 13,
        "industry_name": "Event Management - Corporate \/ Personal \/ Wedding \/ Public Events",
        "main_category": 7
    },
    {
        "id": 14,
        "industry_name": "Multi Level Marketing",
        "main_category": 7
    },
    {
        "id": 15,
        "industry_name": "AGRICULTURE COMMODITIES - Grains \/ Cereals \/ Vegetables \/ Fruits \/ Guar Gum etc.",
        "main_category": 0
    },
    {
        "id": 16,
        "industry_name": "AGRO BASED INDUSTRIES - AGRICULTURE, DAIRY, FISHING, FORESTRY, WILDLIFE",
        "main_category": 0
    },
    {
        "id": 17,
        "industry_name": "Agriculture \/ Farming (Crop Production)",
        "main_category": 16
    },
    {
        "id": 18,
        "industry_name": "Animal Husbandary (Animal Production)",
        "main_category": 16
    },
    {
        "id": 19,
        "industry_name": "Fishing \/ Hunting \/ Trapping",
        "main_category": 16
    },
    {
        "id": 20,
        "industry_name": "Poultry",
        "main_category": 16
    },
    {
        "id": 21,
        "industry_name": "Dairy \/ Dairy Technology",
        "main_category": 16
    },
    {
        "id": 22,
        "industry_name": "Plantation \/ Vineyard \/ Others",
        "main_category": 16
    },
    {
        "id": 23,
        "industry_name": "Forestry",
        "main_category": 16
    },
    {
        "id": 24,
        "industry_name": "Wildlife",
        "main_category": 16
    },
    {
        "id": 25,
        "industry_name": "Landscape Services",
        "main_category": 16
    },
    {
        "id": 26,
        "industry_name": "Lawn Care Services",
        "main_category": 16
    },
    {
        "id": 27,
        "industry_name": "Horticulture \/ Organic Farming",
        "main_category": 16
    },
    {
        "id": 28,
        "industry_name": "Aquaculture",
        "main_category": 16
    },
    {
        "id": 29,
        "industry_name": "Beekeeping \/ Apiculture",
        "main_category": 16
    },
    {
        "id": 30,
        "industry_name": "Seed Cultivation",
        "main_category": 16
    },
    {
        "id": 31,
        "industry_name": "Nursery",
        "main_category": 16
    },
    {
        "id": 32,
        "industry_name": "Plant Culture \/ Algae Cultivation",
        "main_category": 16
    },
    {
        "id": 33,
        "industry_name": "Soil Manangement \/ Treatment",
        "main_category": 16
    },
    {
        "id": 34,
        "industry_name": "Alternative Farming \/ Agroecology",
        "main_category": 16
    },
    {
        "id": 35,
        "industry_name": "Extermination \/ Pest Control \/ Weed Control",
        "main_category": 176
    },
    {
        "id": 36,
        "industry_name": "Other (Agriculture & Forestry \/ Wildlife)",
        "main_category": 16
    },
    {
        "id": 37,
        "industry_name": "AIRLINES \/ AVIATION \/ CIVIL AVIATION",
        "main_category": 0
    },
    {
        "id": 38,
        "industry_name": "Aerospace - Defence \/ Military Aircraft \/ Missiles \/ Space",
        "main_category": 37
    },
    {
        "id": 39,
        "industry_name": "Aerospace - Commercial Airlines",
        "main_category": 37
    },
    {
        "id": 40,
        "industry_name": "Aerospace - General \/ Civil Aviation",
        "main_category": 37
    },
    {
        "id": 41,
        "industry_name": "Airlines \/ Aerospace \/ Aviation Equipment & Components",
        "main_category": 37
    },
    {
        "id": 42,
        "industry_name": "ARCHAEOLOGY FIRMS",
        "main_category": 0
    },
    {
        "id": 43,
        "industry_name": "ARCHITECTURE \/ INTERIOR DESIGN",
        "main_category": 0
    },
    {
        "id": 44,
        "industry_name": "ASTROLOGY",
        "main_category": 0
    },
    {
        "id": 45,
        "industry_name": "AUTOMOBILE \/ AUTOMOTIVE \/ AUTO MANUFACTURERS",
        "main_category": 0
    },
    {
        "id": 46,
        "industry_name": "Automobile - Commercial Vehicle",
        "main_category": 45
    },
    {
        "id": 47,
        "industry_name": "Automobile - Passenger Vehicle",
        "main_category": 45
    },
    {
        "id": 48,
        "industry_name": "Automotive Components \/ Ancillaries",
        "main_category": 45
    },
    {
        "id": 49,
        "industry_name": "Automobile Dealers",
        "main_category": 45
    },
    {
        "id": 50,
        "industry_name": "BANKING \/ FINANCIAL SERVICES \/ BROKING",
        "main_category": 0
    },
    {
        "id": 51,
        "industry_name": "Banking \/ Financial Services",
        "main_category": 50
    },
    {
        "id": 52,
        "industry_name": "NBFC (Non Banking Financial Services)",
        "main_category": 50
    },
    {
        "id": 53,
        "industry_name": "Mortgage Bankers & Brokers",
        "main_category": 50
    },
    {
        "id": 54,
        "industry_name": "MFI (Micro Finance)",
        "main_category": 50
    },
    {
        "id": 55,
        "industry_name": "Private Equity & Investment Firms",
        "main_category": 50
    },
    {
        "id": 56,
        "industry_name": "Securities \/ Stock Brokers \/ Investment Industry",
        "main_category": 50
    },
    {
        "id": 57,
        "industry_name": "Money Transfer Agents \/ Money Changers \/ Money Lenders",
        "main_category": 50
    },
    {
        "id": 58,
        "industry_name": "Collection Agency",
        "main_category": 50
    },
    {
        "id": 59,
        "industry_name": "CERAMICS \/ SANITARY WARE",
        "main_category": 0
    },
    {
        "id": 60,
        "industry_name": "CHEMICALS \/ PAINTS \/ FERTILIZERS",
        "main_category": 0
    },
    {
        "id": 61,
        "industry_name": "Petrochemicals",
        "main_category": 60
    },
    {
        "id": 62,
        "industry_name": "Rubber \/ Plastics \/ Polymers",
        "main_category": 60
    },
    {
        "id": 63,
        "industry_name": "Agrochemicals \/ Fertilizers \/ Pesticides",
        "main_category": 60
    },
    {
        "id": 64,
        "industry_name": "Paints & Emulsions \/ Adhesives",
        "main_category": 60
    },
    {
        "id": 65,
        "industry_name": "Industrial Chemicals \/ Specialty Chemicals \/ Fine Chemicals",
        "main_category": 60
    },
    {
        "id": 66,
        "industry_name": "Soap, Detergents & Cleaning Preparations",
        "main_category": 60
    },
    {
        "id": 67,
        "industry_name": "Other Chemicals",
        "main_category": 60
    },
    {
        "id": 68,
        "industry_name": "CONSTRUCTION \/ ENGINEERING \/ CEMENT",
        "main_category": 0
    },
    {
        "id": 69,
        "industry_name": "Building Construction \/ Utilities \/ Contracting",
        "main_category": 68
    },
    {
        "id": 70,
        "industry_name": "Building Materials",
        "main_category": 68
    },
    {
        "id": 71,
        "industry_name": "Cement, Cement Products, Concrete Manufacturing",
        "main_category": 68
    },
    {
        "id": 72,
        "industry_name": "Marble \/ Granite",
        "main_category": 68
    },
    {
        "id": 73,
        "industry_name": "CONSUMER GOODS - DURABLES",
        "main_category": 0
    },
    {
        "id": 74,
        "industry_name": "Home Appliances, Consumer Electronics",
        "main_category": 73
    },
    {
        "id": 75,
        "industry_name": "Consumer Telecom Equipments - Mobile Phones \/ Headphones \/ Accessories",
        "main_category": 73
    },
    {
        "id": 76,
        "industry_name": "Other Consumer Durables",
        "main_category": 73
    },
    {
        "id": 77,
        "industry_name": "CONSUMER GOODS - OTHERS",
        "main_category": 0
    },
    {
        "id": 78,
        "industry_name": "Bath \/ Kitchen Fittings & Fixtures",
        "main_category": 77
    },
    {
        "id": 79,
        "industry_name": "Electrical - Lighting, Wires, Switches, Fans",
        "main_category": 77
    },
    {
        "id": 80,
        "industry_name": "Leather, Leather Goods",
        "main_category": 86
    },
    {
        "id": 81,
        "industry_name": "Gifts \/ Toys \/ Camera",
        "main_category": 77
    },
    {
        "id": 82,
        "industry_name": "Other Consumer Goods",
        "main_category": 77
    },
    {
        "id": 83,
        "industry_name": "CURRENCY DEALERS \/ REMITTANCE HOUSE - Forex \/ Bitcoin \/ Virtual Currency",
        "main_category": 0
    },
    {
        "id": 84,
        "industry_name": "DEFENCE \/ DEFENSE - Arms \/ Amunitions \/ Explosives \/ Defence Equipments",
        "main_category": 0
    },
    {
        "id": 85,
        "industry_name": "E-COMMERCE \/ MOBILE COMMERCE - Online Market Place \/ Online Shops \/ Mobile Apps",
        "main_category": 0
    },
    {
        "id": 86,
        "industry_name": "EDUCATION \/ TEACHING \/ TRAINING",
        "main_category": 0
    },
    {
        "id": 87,
        "industry_name": "Educational Technology \/ Online Learning \/ Tutoring \/ E-Learning",
        "main_category": 86
    },
    {
        "id": 88,
        "industry_name": "College \/ Universities",
        "main_category": 86
    },
    {
        "id": 89,
        "industry_name": "Schools - Private \/ Residential",
        "main_category": 86
    },
    {
        "id": 90,
        "industry_name": "Technical  \/ Trade \/ Vocational Institutes",
        "main_category": 86
    },
    {
        "id": 91,
        "industry_name": "Tutions \/ Coaching Classes",
        "main_category": 86
    },
    {
        "id": 92,
        "industry_name": "Language Classes \/ Learning",
        "main_category": 86
    },
    {
        "id": 93,
        "industry_name": "Sports Academy",
        "main_category": 86
    },
    {
        "id": 94,
        "industry_name": "Others (Education)",
        "main_category": 86
    },
    {
        "id": 95,
        "industry_name": "ENVIRONMENT - WATER TREATMENT \/ WASTE MANAGEMENT",
        "main_category": 0
    },
    {
        "id": 96,
        "industry_name": "EXPORT \/ IMPORT",
        "main_category": 0
    },
    {
        "id": 97,
        "industry_name": "FACILITY \/ PROPERTY MANAGEMENT SERVICES",
        "main_category": 0
    },
    {
        "id": 98,
        "industry_name": "FINE ARTS \/ ANTIQUE \/ SCULPTURE \/ CRAFT",
        "main_category": 0
    },
    {
        "id": 99,
        "industry_name": "FMCG - FOOD \/ HOME \/ PERSONAL CARE",
        "main_category": 0
    },
    {
        "id": 100,
        "industry_name": "Personal Care, Home Care Products",
        "main_category": 99
    },
    {
        "id": 101,
        "industry_name": "Food \/ Processed Foods \/ Beverages",
        "main_category": 99
    },
    {
        "id": 102,
        "industry_name": "Bakery Products",
        "main_category": 99
    },
    {
        "id": 103,
        "industry_name": "Breweries, Distilleries, Liquor \/ Alcoholic Beverages",
        "main_category": 99
    },
    {
        "id": 104,
        "industry_name": "Dairy Products",
        "main_category": 99
    },
    {
        "id": 105,
        "industry_name": "Meat Products",
        "main_category": 99
    },
    {
        "id": 106,
        "industry_name": "Tobacco, Cigarettes, Biris",
        "main_category": 99
    },
    {
        "id": 107,
        "industry_name": "Other FMCG Products",
        "main_category": 99
    },
    {
        "id": 108,
        "industry_name": "FOOD, HOSPITALITY, TRAVEL & TOURISM",
        "main_category": 0
    },
    {
        "id": 109,
        "industry_name": "QSR \/ Restaurant \/ Bar \/ Cafe \/ Fast Food Chain \/ Bakery",
        "main_category": 108
    },
    {
        "id": 110,
        "industry_name": "Caterer \/ Catering",
        "main_category": 108
    },
    {
        "id": 111,
        "industry_name": "Mobile Food Services \/ Truck Stop \/ Vending Machine",
        "main_category": 108
    },
    {
        "id": 112,
        "industry_name": "Hotels \/ Motels (Casino) \/ Night Club \/ Betting",
        "main_category": 108
    },
    {
        "id": 113,
        "industry_name": "Guest House \/ Service Apartments",
        "main_category": 108
    },
    {
        "id": 114,
        "industry_name": "Cruise Lines",
        "main_category": 108
    },
    {
        "id": 115,
        "industry_name": "Other (Food & Hospitality)",
        "main_category": 108
    },
    {
        "id": 116,
        "industry_name": "FOOTWEAR",
        "main_category": 0
    },
    {
        "id": 117,
        "industry_name": "FRESHER \/ TRAINEE \/ INTERN \/ APPRENTICE",
        "main_category": 0
    },
    {
        "id": 118,
        "industry_name": "GAMING & SPORTS",
        "main_category": 0
    },
    {
        "id": 119,
        "industry_name": "Gaming - Computer \/ Video Gaming",
        "main_category": 118
    },
    {
        "id": 120,
        "industry_name": "Gaming - Casino \/ Racetrack \/ Horse Race",
        "main_category": 118
    },
    {
        "id": 121,
        "industry_name": "Cricket \/ Football \/ Boxing \/ Wrestling \/ Others",
        "main_category": 118
    },
    {
        "id": 122,
        "industry_name": "Other (Gaming & Sports)",
        "main_category": 118
    },
    {
        "id": 123,
        "industry_name": "GEMS & JEWELLERY - Bullion Dealer \/ Artificial Jewellery \/ Jewellery Retail \/ Wholesale",
        "main_category": 0
    },
    {
        "id": 124,
        "industry_name": "GLASS",
        "main_category": 0
    },
    {
        "id": 125,
        "industry_name": "GOVERNMENT ADMINISTRATION \/ URBAN DEVELOPMENT",
        "main_category": 0
    },
    {
        "id": 126,
        "industry_name": "HEALTH SERVICES - Accupuncture \/ Home Health Services \/ Optometry \/ Speech Therapy \/ Others",
        "main_category": 0
    },
    {
        "id": 127,
        "industry_name": "HR, HUMAN RESOURCES",
        "main_category": 0
    },
    {
        "id": 128,
        "industry_name": "HR Staffing & Recruitment Firms \/ Employment Agency \/ Background - Reference Check Firms ",
        "main_category": 127
    },
    {
        "id": 129,
        "industry_name": "HR \/ OD \/ L&D \/ Training \/ Counselling \/ Coaching Firms",
        "main_category": 127
    },
    {
        "id": 130,
        "industry_name": "Payroll \/ Payroll Outsourcing Firms",
        "main_category": 127
    },
    {
        "id": 131,
        "industry_name": "IR \/ Labour Law & IR Compliance Firms",
        "main_category": 127
    },
    {
        "id": 132,
        "industry_name": "Manpower Supply \/ Labour Contractors",
        "main_category": 127
    },
    {
        "id": 133,
        "industry_name": "INDUSTRIAL AUTOMATION \/ ROBOTICS",
        "main_category": 0
    },
    {
        "id": 134,
        "industry_name": "INDUSTRIAL PRODUCTS \/ HEAVY MACHINERY \/ CAPITAL GOODS & INDUSTRIAL SUPPLIES",
        "main_category": 0
    },
    {
        "id": 135,
        "industry_name": "Airline \/ Aerospace \/ Aviation Equipments & Components",
        "main_category": 134
    },
    {
        "id": 136,
        "industry_name": "Casting, Forging, Bearing & Other Components",
        "main_category": 134
    },
    {
        "id": 137,
        "industry_name": "Construction \/ Mining Equipments",
        "main_category": 134
    },
    {
        "id": 138,
        "industry_name": "Engines & Turbines",
        "main_category": 134
    },
    {
        "id": 139,
        "industry_name": "Marine Vessels & Components",
        "main_category": 134
    },
    {
        "id": 140,
        "industry_name": "Medical Equipments & Supplies",
        "main_category": 134
    },
    {
        "id": 141,
        "industry_name": "Metalworking Machinery & Equipments",
        "main_category": 134
    },
    {
        "id": 142,
        "industry_name": "Oil \/ Gas Field Equipments",
        "main_category": 134
    },
    {
        "id": 143,
        "industry_name": "Power Equipment, Cables, EPC",
        "main_category": 134
    },
    {
        "id": 144,
        "industry_name": "Pumps, Motors, Generators",
        "main_category": 134
    },
    {
        "id": 145,
        "industry_name": "Railroad Equipment",
        "main_category": 134
    },
    {
        "id": 146,
        "industry_name": "Telecom Equipment, Cables - Industrial",
        "main_category": 134
    },
    {
        "id": 147,
        "industry_name": "ICTE, Information, Communication, Telecom Equipment & Smart City Components Manufacturing",
        "main_category": 134
    },
    {
        "id": 148,
        "industry_name": "Transportation Equipment Manufacturing",
        "main_category": 134
    },
    {
        "id": 149,
        "industry_name": "Electronic Manufacturing & Equipments",
        "main_category": 134
    },
    {
        "id": 150,
        "industry_name": "Heat Ventilation \/ Air Conditioning",
        "main_category": 134
    },
    {
        "id": 151,
        "industry_name": "Other Heavy Machinery \/ Capital Goods & Industrial Supply",
        "main_category": 134
    },
    {
        "id": 152,
        "industry_name": "INDUSTRY FORUMS \/ ASSOCIATIONS",
        "main_category": 0
    },
    {
        "id": 153,
        "industry_name": "INSURANCE - LIFE \/ GENERAL \/ HEALTH \/ MOTOR",
        "main_category": 0
    },
    {
        "id": 154,
        "industry_name": "INTERNET \/ SOCIAL MEDIA",
        "main_category": 0
    },
    {
        "id": 155,
        "industry_name": "Video Hosting Services",
        "main_category": 154
    },
    {
        "id": 156,
        "industry_name": "Music \/ Video Streaming Services",
        "main_category": 154
    },
    {
        "id": 157,
        "industry_name": "TNC, Transportation Network Companies \/ Ride Sharing \/ Cab Aggregator",
        "main_category": 154
    },
    {
        "id": 158,
        "industry_name": "Online Food Delivery",
        "main_category": 154
    },
    {
        "id": 159,
        "industry_name": "Online Dating Services - Matchmaking (Matrimony) \/ Social Dating",
        "main_category": 154
    },
    {
        "id": 160,
        "industry_name": "Online Gaming Industry \/ Digital Gaming",
        "main_category": 154
    },
    {
        "id": 161,
        "industry_name": "Digital Wallet Platform \/ Online Payment System",
        "main_category": 154
    },
    {
        "id": 162,
        "industry_name": "Online Networking \/ Social \/ Professioanl Interaction",
        "main_category": 154
    },
    {
        "id": 163,
        "industry_name": "Internet Cafe \/ DTP Services",
        "main_category": 154
    },
    {
        "id": 164,
        "industry_name": "IT - INFORMATION TECHNOLOGY ",
        "main_category": 0
    },
    {
        "id": 165,
        "industry_name": "IT - Computer Hardware & Peripherals | Networking \/ Printers \/ Ink Toners \/ Other accessories",
        "main_category": 164
    },
    {
        "id": 166,
        "industry_name": "IT - Software \/ Product Development",
        "main_category": 164
    },
    {
        "id": 167,
        "industry_name": "IT Services - Animation \/ Web Design \/ E-Commerce \/ Mobile App Design",
        "main_category": 164
    },
    {
        "id": 168,
        "industry_name": "IT - Consulting Services \/ Advisory Services",
        "main_category": 164
    },
    {
        "id": 169,
        "industry_name": "IT - Software Sellers",
        "main_category": 164
    },
    {
        "id": 170,
        "industry_name": "IT - Security Systems, CCTV, others",
        "main_category": 164
    },
    {
        "id": 171,
        "industry_name": "ITES \/ BPO \/ KPO \/ OUTSOURCING \/ CUSTOMER SERVICE \/  CALL CENTER \/ OPERATIONS",
        "main_category": 0
    },
    {
        "id": 172,
        "industry_name": "LEGAL \/ LAW \/ CS",
        "main_category": 0
    },
    {
        "id": 173,
        "industry_name": "Lawyers \/ Attorneys \/ Law \/ Legal Firms",
        "main_category": 172
    },
    {
        "id": 174,
        "industry_name": "CS, Company Secretary Firm",
        "main_category": 172
    },
    {
        "id": 175,
        "industry_name": "Lobbyists",
        "main_category": 172
    },
    {
        "id": 176,
        "industry_name": "MEDIA & ENTERTAINMENT",
        "main_category": 0
    },
    {
        "id": 177,
        "industry_name": "Media \/ Dotcom \/ Entertainment",
        "main_category": 176
    },
    {
        "id": 178,
        "industry_name": "Cable & Satellite TV Production and Distribution",
        "main_category": 176
    },
    {
        "id": 179,
        "industry_name": "Commercial TV and Radio Stations \/ Broadcasting",
        "main_category": 176
    },
    {
        "id": 180,
        "industry_name": "TV \/ Movies \/ Films \/ Music \/ Digital Media Content Production",
        "main_category": 176
    },
    {
        "id": 181,
        "industry_name": "Web Series \/ Ad Films \/ Short Films \/ Documentary",
        "main_category": 176
    },
    {
        "id": 182,
        "industry_name": "Over-the-Top (OTT) Media Services \/ Streaming Media \/ Video-on-Demand",
        "main_category": 176
    },
    {
        "id": 183,
        "industry_name": "Film Distribution House",
        "main_category": 16
    },
    {
        "id": 184,
        "industry_name": "Multiplex \/ Movie Theaters",
        "main_category": 176
    },
    {
        "id": 185,
        "industry_name": "Media Tech \/ Virtual \/ Augmented Reality",
        "main_category": 176
    },
    {
        "id": 186,
        "industry_name": "MEDICAL \/ HEALTHCARE \/ HOSPITALS",
        "main_category": 0
    },
    {
        "id": 187,
        "industry_name": "Medical Institutions \/ Corporate \/ Government Hospitals",
        "main_category": 186
    },
    {
        "id": 188,
        "industry_name": "Nursing Home \/ Private Clinics \/ Dentist",
        "main_category": 186
    },
    {
        "id": 189,
        "industry_name": "Telemedicine \/ Medical Tourism",
        "main_category": 186
    },
    {
        "id": 190,
        "industry_name": "Primary \/ Secondary \/ Tertiary \/ Quaternary Care Healthcare Centres (PHCs)",
        "main_category": 186
    },
    {
        "id": 191,
        "industry_name": "IVF \/ Diagnostic Centers",
        "main_category": 186
    },
    {
        "id": 192,
        "industry_name": "Other Healthcare Equipments & Supply",
        "main_category": 186
    },
    {
        "id": 193,
        "industry_name": "METALS - IRON \/ STEEL \/ ZINC \/ COPPER \/ OTHERS",
        "main_category": 0
    },
    {
        "id": 194,
        "industry_name": "MINING",
        "main_category": 0
    },
    {
        "id": 195,
        "industry_name": "MOTOR VEHICLE SERVICES - Motor Vehicle Rental \/ Repair \/ Car Wash \/ Others ",
        "main_category": 0
    },
    {
        "id": 196,
        "industry_name": "MUSIC - Musical Instruments",
        "main_category": 0
    },
    {
        "id": 197,
        "industry_name": "NGO \/ NPO \/ SOCIAL SERVICES",
        "main_category": 0
    },
    {
        "id": 198,
        "industry_name": "NGO \/ Social Services \/ Social Work",
        "main_category": 197
    },
    {
        "id": 199,
        "industry_name": "Human Rights \/ Animal Welfare",
        "main_category": 197
    },
    {
        "id": 200,
        "industry_name": "Healthcare \/ Research Educational Welfare & Charitable Trust \/ Scholarship",
        "main_category": 197
    },
    {
        "id": 201,
        "industry_name": "Environment \/ Nature Conservation",
        "main_category": 197
    },
    {
        "id": 202,
        "industry_name": "Religious \/ Community Welfare \/ Spirituality",
        "main_category": 197
    },
    {
        "id": 203,
        "industry_name": "Women & Child Welfare \/ Old Age Homes \/ Disabled \/ Mentally Retarded \/ Blind \/ Shelter Services",
        "main_category": 197
    },
    {
        "id": 204,
        "industry_name": "NUTRITION \/ WELLNESS",
        "main_category": 0
    },
    {
        "id": 205,
        "industry_name": "OFFICE AUTOMATION EQUIPMENTS \/ OFFICE EQUIPMENTS",
        "main_category": 0
    },
    {
        "id": 206,
        "industry_name": "OIL & GAS \/ POWER \/ INFRASTRUCTURE \/ ENERGY",
        "main_category": 0
    },
    {
        "id": 207,
        "industry_name": "Power & Power Distribution",
        "main_category": 206
    },
    {
        "id": 208,
        "industry_name": "Petroleum Oil & Gas Refinery \/ Distribution",
        "main_category": 206
    },
    {
        "id": 209,
        "industry_name": "Petrol Pumps \/ Gas Stations \/ Electric Charging Stations",
        "main_category": 206
    },
    {
        "id": 210,
        "industry_name": "Bio Fuels",
        "main_category": 206
    },
    {
        "id": 211,
        "industry_name": "PACKAGING - Paper \/ Woven Bags, etc.",
        "main_category": 0
    },
    {
        "id": 212,
        "industry_name": "PAPER & PULP - Pulp & Paper \/ Forestry, Wood \/ Logging, Timber & Paper Mills",
        "main_category": 0
    },
    {
        "id": 213,
        "industry_name": "PERSONAL SERVICES",
        "main_category": 0
    },
    {
        "id": 214,
        "industry_name": "Personal Care \/ Beauty \/ Grooming",
        "main_category": 213
    },
    {
        "id": 215,
        "industry_name": "Beauty Salon \/ Barber Shop \/ Spa",
        "main_category": 213
    },
    {
        "id": 216,
        "industry_name": "Creche \/ Child Day Care Services",
        "main_category": 213
    },
    {
        "id": 217,
        "industry_name": "Diet \/ Fitness \/ Wellness Center \/ Health Club \/ Gymnasium",
        "main_category": 213
    },
    {
        "id": 218,
        "industry_name": "Dry Cleaning \/ Laundry",
        "main_category": 213
    },
    {
        "id": 219,
        "industry_name": "Photography",
        "main_category": 213
    },
    {
        "id": 220,
        "industry_name": "Animal Boarding \/ Veterinary \/ Pet Care",
        "main_category": 213
    },
    {
        "id": 221,
        "industry_name": "Florist",
        "main_category": 213
    },
    {
        "id": 222,
        "industry_name": "Janitorial \/ Cleaning Services",
        "main_category": 213
    },
    {
        "id": 223,
        "industry_name": "PHARMACEUTICAL \/ MEDICAL DEVICES \/ CRO",
        "main_category": 0
    },
    {
        "id": 224,
        "industry_name": "Pharmaceutical - API \/ Bulk Drugs",
        "main_category": 223
    },
    {
        "id": 225,
        "industry_name": "Pharmaceutical - Formulations",
        "main_category": 223
    },
    {
        "id": 226,
        "industry_name": "Pharmaceutical - OTC",
        "main_category": 223
    },
    {
        "id": 227,
        "industry_name": "Biotech \/ Biopharmaceuticals",
        "main_category": 223
    },
    {
        "id": 228,
        "industry_name": "CRO, Clinical Research Organization",
        "main_category": 223
    },
    {
        "id": 229,
        "industry_name": "Medical Devices \/ Equipments",
        "main_category": 223
    },
    {
        "id": 230,
        "industry_name": "POSTAL & COURIER SERVICES",
        "main_category": 0
    },
    {
        "id": 231,
        "industry_name": "PUBLISHING & PRINTING - Books, Magazines & Newspapers Publishing",
        "main_category": 0
    },
    {
        "id": 232,
        "industry_name": "REAL ESTATE & HOUSING - Property Management \/ Broker \/ Agent",
        "main_category": 0
    },
    {
        "id": 233,
        "industry_name": "REALTY  & INFRASTRUCTURE - Ports, etc.",
        "main_category": 0
    },
    {
        "id": 234,
        "industry_name": "RETAIL \/ WHOLESALE \/ DISTRIBUTORS \/ STOCKIEST",
        "main_category": 0
    },
    {
        "id": 235,
        "industry_name": "Organised Retail - Large Super Markets \/ Shopping Malls",
        "main_category": 234
    },
    {
        "id": 236,
        "industry_name": "Organised Retail - Brand Outlets (EBO \/ MBO) \/ Retail Chain \/ Pharmacy",
        "main_category": 234
    },
    {
        "id": 237,
        "industry_name": "Unorganised Retail - Independent \/ Convenience Stores, Mom-and-Pop Stores",
        "main_category": 234
    },
    {
        "id": 238,
        "industry_name": "Consumer Products - Wholesalers \/ Distributors \/ Stockiest \/ C&F Agents",
        "main_category": 234
    },
    {
        "id": 239,
        "industry_name": "Cold Chain \/ Warehouse \/ Godowns \/ Logistic Hubs",
        "main_category": 234
    },
    {
        "id": 240,
        "industry_name": "SCIENCE & TECHNOLOGY",
        "main_category": 0
    },
    {
        "id": 241,
        "industry_name": "SCRAP METAL DEALERS",
        "main_category": 0
    },
    {
        "id": 242,
        "industry_name": "SECURITY \/ DETECTIVE SERVICES",
        "main_category": 0
    },
    {
        "id": 243,
        "industry_name": "SHIPPING",
        "main_category": 0
    },
    {
        "id": 244,
        "industry_name": "SPACE",
        "main_category": 0
    },
    {
        "id": 245,
        "industry_name": "STATIONERY - Paper \/ Non-Paper Stationery (School, College, Office Supplies)",
        "main_category": 0
    },
    {
        "id": 246,
        "industry_name": "STATISTICS \/ ANALYTICS \/ ACTURIAL SCIENCE \/ DATA MANAGEMENT FIRMS",
        "main_category": 0
    },
    {
        "id": 247,
        "industry_name": "STOCK EXCHANGE \/ COMMODITY EXCHANGE",
        "main_category": 0
    },
    {
        "id": 248,
        "industry_name": "STRATEGY \/ MANAGEMENT CONSULTING FIRMS",
        "main_category": 0
    },
    {
        "id": 249,
        "industry_name": "TELECOM \/ ISP",
        "main_category": 0
    },
    {
        "id": 250,
        "industry_name": "Telecom \/ Mobile \/ Internet Broadband Services",
        "main_category": 249
    },
    {
        "id": 251,
        "industry_name": "Telecom Equipments - Consumer",
        "main_category": 249
    },
    {
        "id": 252,
        "industry_name": "Telecom Equipments, Cables - Industrial",
        "main_category": 249
    },
    {
        "id": 253,
        "industry_name": "TEXTILES \/ CLOTHING \/ FASHION",
        "main_category": 0
    },
    {
        "id": 254,
        "industry_name": "Textile Manufacturing \/ Sourcing \/ Supply",
        "main_category": 253
    },
    {
        "id": 255,
        "industry_name": "Textile Design \/ Fashion Design",
        "main_category": 253
    },
    {
        "id": 256,
        "industry_name": "TRANSPORTATION & LOGISTICS",
        "main_category": 0
    },
    {
        "id": 257,
        "industry_name": "Air Transportion",
        "main_category": 256
    },
    {
        "id": 258,
        "industry_name": "Marine \/ Maritime Transport \/ Boat Services",
        "main_category": 256
    },
    {
        "id": 259,
        "industry_name": "Surface \/ Road Transport",
        "main_category": 256
    },
    {
        "id": 260,
        "industry_name": "Emergency Medical Transportation",
        "main_category": 256
    },
    {
        "id": 261,
        "industry_name": "Truck Transportation (Fuel & Non Fuel)",
        "main_category": 256
    },
    {
        "id": 262,
        "industry_name": "Courier \/ Freight \/ Logistics",
        "main_category": 256
    },
    {
        "id": 263,
        "industry_name": "Taxi Services \/ Limousine Services",
        "main_category": 256
    },
    {
        "id": 264,
        "industry_name": "Packers & Movers",
        "main_category": 256
    },
    {
        "id": 265,
        "industry_name": "Other (Transportation)",
        "main_category": 256
    },
    {
        "id": 266,
        "industry_name": "TYRES",
        "main_category": 0
    },
    {
        "id": 267,
        "industry_name": "UNSKILLED LABOUR \/ DOMESTIC HELP",
        "main_category": 0
    },
    {
        "id": 268,
        "industry_name": "WRITING & EDITING \/ JOURNALISM",
        "main_category": 0
    },
    {
        "id": 269,
        "industry_name": "OTHERS",
        "main_category": 0
    },
    {
        "id": 270,
        "industry_name": "Miscellaneous \/ Others",
        "main_category": 0
    },
    {
        "id": 275,
        "industry_name": "Management Consulting",
        "main_category": 0
    },
    {
        "id": 276,
        "industry_name": "Publishing - Educational Books",
        "main_category": 231
    },
    {
        "id": 277,
        "industry_name": "Job Portal \/ Job Board \/ Jobs Aggregator",
        "main_category": 0
    },
    {
        "id": 278,
        "industry_name": "Machine Learning \/ ML \/ Artificial Intelligence \/ AI",
        "main_category": 0
    },
    {
        "id": 279,
        "industry_name": "Motion Picture \/ Sound Recording \/ AV \/ Recording Studio",
        "main_category": 0
    }
]

export default industryData;