import {
  InstanceBase,
  runEntrypoint,
  CompanionFeedbackDefinitions,
  CompanionHTTPRequest,
  CompanionHTTPResponse,
  SomeCompanionConfigField,
} from '@companion-module/base'
import { Config, getConfigFields } from './config'
import { getUpgrades } from './upgrade'

class LoLInstance extends InstanceBase<Config> {
  constructor(internal: unknown) {
    super(internal)
    this.instanceOptions.disableVariableValidation = true
  }
  public config: Config = {
    host: '',
  }

  public async init(config: Config): Promise<void> {}

  public async destroy(): Promise<void> {}

  /**
   * @param config new configuration data
   * @description triggered every time the config for this instance is saved
   */
  public async configUpdated(config: Config): Promise<void> {
    this.config = config
    this.updateInstance()
  }

  public getConfigFields(): SomeCompanionConfigField[] {
    return getConfigFields()
  }

  private updateInstance(): void {
    // const actions = []
    // const feedbacks = []
    // this.setActionDefinitions(actions)
    // this.setFeedbackDefinitions(feedbacks)
  }
}

export = LoLInstance

runEntrypoint(LoLInstance, getUpgrades())
