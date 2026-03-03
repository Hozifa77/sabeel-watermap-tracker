export interface RegionData {
    region_id: string;
    region_name: string;
    country: string;
    latitude: number;
    longitude: number;
    population_density_per_km2: number;
    total_population_affected: number;
    water_scarcity_severity_index_0_100: number;
    average_project_cost_usd: number;
    intervention_type: 'Well drilling' | 'Water purification' | 'Pipeline infrastructure' | 'Rainwater harvesting';
    data_source_name: string;
    data_source_link: string;
    last_updated_date: string;
    donation_links?: { name: string, url: string }[];
}

export const MOCK_REGIONS: RegionData[] = [
    {
        region_id: "RGN-1001",
        region_name: "Tigray Sub-region Alpha",
        country: "Ethiopia",
        latitude: 14.0323,
        longitude: 38.3166,
        population_density_per_km2: 120,
        total_population_affected: 450000,
        water_scarcity_severity_index_0_100: 92,
        average_project_cost_usd: 25000,
        intervention_type: "Well drilling",
        data_source_name: "World Resource Institute",
        data_source_link: "https://www.wri.org",
        last_updated_date: "2026-01-15T00:00:00Z",
        donation_links: [
            { name: "Water.org", url: "https://water.org" },
            { name: "Charity: Water", url: "https://www.charitywater.org" }
        ]
    },
    {
        region_id: "RGN-1002",
        region_name: "Darfur Beta",
        country: "Sudan",
        latitude: 13.6277,
        longitude: 25.3549,
        population_density_per_km2: 85,
        total_population_affected: 320000,
        water_scarcity_severity_index_0_100: 88,
        average_project_cost_usd: 18000,
        intervention_type: "Well drilling",
        data_source_name: "UNICEF Water Data",
        data_source_link: "https://data.unicef.org",
        last_updated_date: "2026-02-10T00:00:00Z",
        donation_links: [
            { name: "UNICEF", url: "https://www.unicef.org/sudan" }
        ]
    },
    {
        region_id: "RGN-1003",
        region_name: "Balochistan D-zone",
        country: "Pakistan",
        latitude: 28.4907,
        longitude: 65.0958,
        population_density_per_km2: 40,
        total_population_affected: 850000,
        water_scarcity_severity_index_0_100: 75,
        average_project_cost_usd: 40000,
        intervention_type: "Pipeline infrastructure",
        data_source_name: "Global Water Watch",
        data_source_link: "https://globalwaterwatch.earth",
        last_updated_date: "2026-02-01T00:00:00Z"
    },
    {
        region_id: "RGN-1004",
        region_name: "Al Mahrah District 4",
        country: "Yemen",
        latitude: 16.5416,
        longitude: 51.2031,
        population_density_per_km2: 25,
        total_population_affected: 150000,
        water_scarcity_severity_index_0_100: 95,
        average_project_cost_usd: 35000,
        intervention_type: "Water purification",
        data_source_name: "Red Cross Reporting",
        data_source_link: "https://www.icrc.org",
        last_updated_date: "2026-01-20T00:00:00Z",
        donation_links: [
            { name: "ICRC Yemen", url: "https://www.icrc.org/en/where-we-work/middle-east/yemen" }
        ]
    },
    {
        region_id: "RGN-1005",
        region_name: "Thar Desert Outpost",
        country: "India",
        latitude: 26.9157,
        longitude: 70.9083,
        population_density_per_km2: 60,
        total_population_affected: 210000,
        water_scarcity_severity_index_0_100: 60,
        average_project_cost_usd: 12000,
        intervention_type: "Rainwater harvesting",
        data_source_name: "National Water Registry",
        data_source_link: "https://example.org",
        last_updated_date: "2026-02-18T00:00:00Z",
        donation_links: [
            { name: "WaterAid India", url: "https://www.wateraid.org/in/" }
        ]
    },
    {
        region_id: "RGN-1006",
        region_name: "Garissa Rural",
        country: "Kenya",
        latitude: -0.4532,
        longitude: 39.6461,
        population_density_per_km2: 30,
        total_population_affected: 95000,
        water_scarcity_severity_index_0_100: 82,
        average_project_cost_usd: 22000,
        intervention_type: "Well drilling",
        data_source_name: "WASH Observatory",
        data_source_link: "https://washdata.org",
        last_updated_date: "2026-01-28T00:00:00Z",
        donation_links: [
            { name: "Amref Health Africa", url: "https://amref.org/" }
        ]
    },
    {
        region_id: "RGN-1007",
        region_name: "Kandahar Province C",
        country: "Afghanistan",
        latitude: 31.6289,
        longitude: 65.7372,
        population_density_per_km2: 70,
        total_population_affected: 420000,
        water_scarcity_severity_index_0_100: 91,
        average_project_cost_usd: 28000,
        intervention_type: "Well drilling",
        data_source_name: "UNOCHA Hub",
        data_source_link: "https://unocha.org",
        last_updated_date: "2026-02-05T00:00:00Z"
    },
    {
        region_id: "RGN-1008",
        region_name: "Sana'a Outskirts",
        country: "Yemen",
        latitude: 15.3694,
        longitude: 44.1910,
        population_density_per_km2: 150,
        total_population_affected: 600000,
        water_scarcity_severity_index_0_100: 98,
        average_project_cost_usd: 45000,
        intervention_type: "Water purification",
        data_source_name: "Yemen Water Project",
        data_source_link: "https://example.org/ywp",
        last_updated_date: "2026-02-20T00:00:00Z",
        donation_links: [
            { name: "Save the Children Yemen", url: "https://yemen.savethechildren.net/" }
        ]
    },
    {
        region_id: "RGN-1009",
        region_name: "Lake Chad Basin",
        country: "Chad",
        latitude: 13.0,
        longitude: 15.0,
        population_density_per_km2: 15,
        total_population_affected: 250000,
        water_scarcity_severity_index_0_100: 89,
        average_project_cost_usd: 15000,
        intervention_type: "Well drilling",
        data_source_name: "African Development Bank",
        data_source_link: "https://afdb.org",
        last_updated_date: "2026-01-30T00:00:00Z"
    },
    {
        region_id: "RGN-1010",
        region_name: "Mopti Region",
        country: "Mali",
        latitude: 14.4958,
        longitude: -4.1986,
        population_density_per_km2: 20,
        total_population_affected: 180000,
        water_scarcity_severity_index_0_100: 85,
        average_project_cost_usd: 20000,
        intervention_type: "Pipeline infrastructure",
        data_source_name: "Mali Wash Org",
        data_source_link: "https://example.org/mali",
        last_updated_date: "2026-02-12T00:00:00Z"
    },
    {
        region_id: "RGN-1011",
        region_name: "Gaza Strip North",
        country: "Palestine",
        latitude: 31.5,
        longitude: 34.4667,
        population_density_per_km2: 5000,
        total_population_affected: 1500000,
        water_scarcity_severity_index_0_100: 100,
        average_project_cost_usd: 100000,
        intervention_type: "Water purification",
        data_source_name: "UNRWA",
        data_source_link: "https://unrwa.org",
        last_updated_date: "2026-02-22T00:00:00Z",
        donation_links: [
            { name: "UNRWA Donate", url: "https://donate.unrwa.org/" },
            { name: "Medical Aid for Palestinians", url: "https://www.map.org.uk/" }
        ]
    },
    {
        region_id: "RGN-1012",
        region_name: "Somali Region",
        country: "Ethiopia",
        latitude: 6.9424,
        longitude: 43.7744,
        population_density_per_km2: 20,
        total_population_affected: 600000,
        water_scarcity_severity_index_0_100: 88,
        average_project_cost_usd: 30000,
        intervention_type: "Well drilling",
        data_source_name: "USAID Water & Sanitation",
        data_source_link: "https://www.usaid.gov",
        last_updated_date: "2026-02-25T00:00:00Z",
        donation_links: [
            { name: "Oxfam", url: "https://www.oxfam.org/" }
        ]
    },
    {
        region_id: "RGN-1013",
        region_name: "Afar Triangle",
        country: "Djibouti",
        latitude: 11.8251,
        longitude: 42.5903,
        population_density_per_km2: 12,
        total_population_affected: 100000,
        water_scarcity_severity_index_0_100: 97,
        average_project_cost_usd: 24000,
        intervention_type: "Water purification",
        data_source_name: "Global Drought Monitor",
        data_source_link: "https://example.org/drought",
        last_updated_date: "2026-02-28T00:00:00Z"
    },
    {
        region_id: "RGN-1014",
        region_name: "Atacama Region Rural",
        country: "Chile",
        latitude: -27.3667,
        longitude: -70.3333,
        population_density_per_km2: 4,
        total_population_affected: 45000,
        water_scarcity_severity_index_0_100: 72,
        average_project_cost_usd: 50000,
        intervention_type: "Pipeline infrastructure",
        data_source_name: "Chile Water Ministry",
        data_source_link: "https://mop.gob.cl",
        last_updated_date: "2026-03-01T00:00:00Z"
    }
];

export function calculatePriorityScore(region: RegionData) {
    return (region.water_scarcity_severity_index_0_100 * region.population_density_per_km2) / region.average_project_cost_usd;
}

export function getSeverityLabel(score: number): { label: string, color: string, className: string } {
    if (score >= 90) return { label: 'Critical', color: '#ef4444', className: 'badge-critical' };
    if (score >= 75) return { label: 'High', color: '#f97316', className: 'badge-high' };
    if (score >= 60) return { label: 'Medium', color: '#eab308', className: 'badge-medium' };
    return { label: 'Low', color: '#22c55e', className: 'badge-low' };
}
