import {useMemo} from 'react'

import { DashboardGraphsQuery } from '../graphql/generated';

const useDerivedPayloadsData = (payloads: DashboardGraphsQuery["payloads"]) => {
    const averagePayloadSize = useMemo(() => {
      if (!payloads) return 0;
  
      const total = payloads.reduce((total, payload) => {
        if (payload?.payload_mass_kg) {
          total += payload?.payload_mass_kg;
        }
        return total;
      }, 0);
  
      return Math.floor(total / payloads.length);
    }, [payloads]);
  
    const uniquePayloadCustomers = useMemo(() => {
      if (!payloads) return 0;
  
      const map: Record<string, true> = {};
  
      payloads.forEach((payload) => {
        if (!payload || !payload.customers) return;
  
        payload?.customers.forEach((customer) => {
          if (!customer || map[customer]) return;
  
          map[customer] = true;
        });
      });
  
      return Object.keys(map).length;
    }, [payloads]);
  
    const countByNationality = useMemo(() => {
      if (!payloads) return [];
      const counts: Record<string, number> = {};
  
      payloads.forEach((payload) => {
        if (!payload || !payload.nationality) return;
  
        if (!counts[payload.nationality]) {
          counts[payload.nationality] = 1;
        } else {
          counts[payload.nationality] += 1;
        }
      });
  
      return Object.keys(counts)
        .map(country => ({name: country, count: counts[country]}))
        .sort((a, b) => a.count > b.count ? -1 : 1)
    }, [payloads]);
  
    return { averagePayloadSize, uniquePayloadCustomers, countByNationality };
  };

  const useDerivedMissionsData = (missions: DashboardGraphsQuery['missions']) => {

  }


  export { useDerivedPayloadsData, useDerivedMissionsData }