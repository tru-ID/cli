import { Config } from '@oclif/core'
import UsageCommand from '../../helpers/UsageCommand'

export default class HourlyUsage extends UsageCommand {
  static description =
    'Get Hourly Usage. The date range defaults to current date.'

  static flags = {
    ...UsageCommand.flags,
  }

  constructor(argv: string[], config: Config) {
    super(argv, config, 'hourly')
  }

  defaultSearch(): string {
    return `date>=${new Date().toISOString().substring(0, 10)}`
  }
}
