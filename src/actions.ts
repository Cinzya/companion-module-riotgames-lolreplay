import LoLInstance from './'
import { replayAPIInstance } from './data'
import type {
  CompanionActionDefinitions,
  SomeCompanionActionInputField,
} from '@companion-module/base'
import { camelCaseToSnakeCase, prettyfyStr } from './utils'
import { ReplayService } from './http'

export class Actions {
  private readonly instance: LoLInstance
  public actions: CompanionActionDefinitions = {}
  private replayapi: ReplayService

  constructor(instance: LoLInstance, api: ReplayService) {
    this.instance = instance
    this.replayapi = api

    this.createPostActions()
  }

  createPostActions(): void {
    for (const [key, value] of Object.entries(replayAPIInstance)) {
      const actionId = camelCaseToSnakeCase(key)
      let options: SomeCompanionActionInputField[] = []
      if (typeof value === 'number') {
        options = [
          {
            type: 'number',
            id: 'value',
            label: 'Value',
            default: value,
            min: -100000,
            max: 100000,
          },
        ]
      } else if (typeof value === 'string') {
        options = [
          {
            type: 'textinput',
            id: 'value',
            label: 'Value',
            default: value,
          },
        ]
      } else if (typeof value === 'boolean') {
        options = [
          {
            type: 'dropdown',
            id: 'value',
            label: 'Value',
            default: `${value}`,
            choices: [
              { id: 'true', label: 'On' },
              { id: 'false', label: 'Off' },
            ],
          },
        ]
      }
      this.actions[actionId] = {
        name: `Set ${prettyfyStr(key)}`,
        options: options,
        callback: ({ options }) => {
          this.replayapi.post({ [key]: options.value as string })
        },
      }
    }
  }

  UpdateActionDefinitions(): void {
    this.instance.setActionDefinitions(this.actions)
  }
}
