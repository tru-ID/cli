import { CliUx } from '@oclif/core'
import { APIConfiguration } from '../../api/APIConfiguration'
import {
  IWorkspaceResource,
  WorkspacesAPIClient,
} from '../../api/WorkspacesAPIClient'
import CommandWithGlobalConfig from '../../helpers/CommandWithGlobalConfig'
import { logApiError } from '../../utilities'

export default class WorkspaceDefault extends CommandWithGlobalConfig {
  static description = 'Displays default workspace information'

  static flags = {
    ...CommandWithGlobalConfig.flags,
    output: CliUx.ux.table.flags().output,
    'no-header': CliUx.ux.table.flags()['no-header'],
    'no-truncate': CliUx.ux.table.flags()['no-truncate'],
  }

  async run() {
    const result = await this.parse(WorkspaceDefault)
    this.flags = result.flags

    await super.run()

    const workspacesAPIClient = new WorkspacesAPIClient(
      new APIConfiguration({
        clientId: this.globalConfig?.defaultWorkspaceClientId,
        clientSecret: this.globalConfig?.defaultWorkspaceClientSecret,
        scopes: ['workspaces'],
        baseUrl:
          this.globalConfig?.apiBaseUrlOverride ??
          `https://${this.globalConfig?.defaultWorkspaceDataResidency}.api.tru.id`,
      }),
      this.logger,
    )

    let singleResource: IWorkspaceResource
    try {
      singleResource = await workspacesAPIClient.get('default')

      this.displayResults([singleResource])
    } catch (error) {
      logApiError(this, error)
      this.exit(1)
    }
  }

  displayResults(resources: IWorkspaceResource[]) {
    CliUx.ux.table(
      resources,
      {
        credentials_client_id: {
          header: 'credentials.client_id',
          get: (row: IWorkspaceResource) => row.credentials.client_id,
        },
        data_residency: {
          header: 'data_residency',
        },
        'balance.amount_available': {
          header: 'balance.amount_available',
          get: (row: IWorkspaceResource) =>
            row._embedded.balance.amount_available,
        },
        'balance.currency': {
          header: 'balance.currency',
          get: (row: IWorkspaceResource) => row._embedded.balance.currency,
        },
        created_at: {
          header: 'created_at',
        },
      },
      {
        printLine: (s: any) => {
          this.logger!.info(s)
        },
        ...this.flags, // parsed flags
      },
    )
  }
}
