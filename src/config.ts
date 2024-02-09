import { SomeCompanionConfigField } from '@companion-module/base'
import { Regex } from '@companion-module/base'

export interface Config {
  host: string
  apiPollingInterval: number
}

export const getConfigFields = (): SomeCompanionConfigField[] => {
  return [
    {
      type: 'textinput',
      id: 'host',
      label: 'Taget host',
      width: 6,
      regex: Regex.IP,
    },
    {
      type: 'number',
      id: 'apiPollingInterval',
      label: 'API Polling interval (ms) (default: 250, min: 100)',
      width: 6,
      default: 250,
      min: 100,
      max: 10000,
    },
  ]
}
