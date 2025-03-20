'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {getCache, setCache} from "@utils";
import moment from "moment-timezone";
import { useLocaleClient } from '@lib/useLocaleClient'

const cacheKey = 'moment-runner-tz-def'
const cacheTZ = getCache(cacheKey)
const currentTZ = moment.tz.guess();
let userTZ = cacheTZ || currentTZ;
if (userTZ) {
  moment.tz.setDefault(currentTZ);
}



export function TzSelect() {
  const {t} = useLocaleClient();

const mainTimezones = [
  { label: t('IDLW'), value: 'Pacific/Kwajalein' },
  { label: t('Midway-Island'), value: 'Pacific/Midway' },
  { label: t('Hawaii-Aleutian'), value: 'Pacific/Honolulu' },
  { label: t('Alaska'), value: 'America/Anchorage' },
  { label: t('Pacific'), value: 'America/Los_Angeles' },
  { label: t('Mountain'), value: 'America/Denver' },
  { label: t('Central'), value: 'America/Chicago' },
  { label: t('Eastern'), value: 'America/New_York' },
  { label: t('Atlantic'), value: 'Atlantic/Bermuda' },
  { label: t('Argentina'), value: 'America/Argentina/Buenos_Aires' },
  { label: t('South-Georgia'), value: 'Atlantic/South_Georgia' },
  { label: t('Azores'), value: 'Atlantic/Azores' },
  { label: t('Greenwich'), value: 'Etc/GMT' },
  { label: t('Central-European'), value: 'Europe/Berlin' },
  { label: t('Eastern-European'), value: 'Europe/Kiev' },
  { label: t('Moscow'), value: 'Europe/Moscow' },
  { label: t('Azerbaijan'), value: 'Asia/Baku' },
  { label: t('Pakistan'), value: 'Asia/Karachi' },
  { label: t('Bangladesh'), value: 'Asia/Dhaka' },
  { label: t('Indian'), value: 'Asia/Bangkok' },
  { label: t('China'), value: 'Asia/Shanghai' },
  { label: t('Japan'), value: 'Asia/Tokyo' },
  { label: t('Australia-Eastern'), value: 'Australia/Sydney' },
  { label: t('Solomon-Islands'), value: 'Pacific/Guadalcanal' }
];
  const [selectedTZ, setSelectedTZ] = React.useState(userTZ);
  const switchTZ = (value: string) => {
    if (!value) return;
    setSelectedTZ(value);
    setCache(cacheKey, value);
    moment.tz.setDefault(value);
  };

  return (
    <Select onValueChange={switchTZ} defaultValue={selectedTZ}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Time zone" />
      </SelectTrigger>
      <SelectContent>
        {mainTimezones.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
