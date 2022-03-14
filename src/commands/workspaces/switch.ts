import { CliUx } from '@oclif/core'
import fs from 'fs-extra'
import { RefreshTokenManager } from '../../api/TokenManager'
import {
  IWorkspaceResource,
  WorkspacesAPIClient,
} from '../../api/WorkspacesAPIClient'
import {
  apiBaseUrlDRString,
  issuerUrl,
  loginBaseUrl,
  tokenUrl,
} from '../../DefaultUrls'
import CommandWithGlobalConfig from '../../helpers/CommandWithGlobalConfig'
import { IGlobalAuthConfiguration } from '../../IGlobalAuthConfiguration'
import { logApiError } from '../../utilities'

export default class WorkspaceSwitch extends CommandWithGlobalConfig {
  static description = 'Switch workspaces'

  static flags = {
    ...CommandWithGlobalConfig.flags,
    output: CliUx.ux.table.flags().output,
    'no-header': CliUx.ux.table.flags()['no-header'],
    'no-truncate': CliUx.ux.table.flags()['no-truncate'],
  }

  static args = [
    {
      name: 'data_residency',
      required: true,
      description: 'Data residency where the workspace is located',
    },
    {
      name: 'workspace_id',
      required: true,
      description: 'Selected Workspace',
    },
  ]

  async run() {
    const result = await this.parse(WorkspaceSwitch)
    this.flags = result.flags
    this.args = result.args

    await super.run()

    const tokenManager = new RefreshTokenManager(
      {
        refreshToken: this.globalConfig!.tokenInfo!.refresh_token!,
        configLocation: this.getConfigPath(),
        tokenUrl: tokenUrl(loginBaseUrl(this.globalConfig!)),
        issuerUrl: issuerUrl(this.globalConfig!),
      },
      this.logger,
    )

    const workspacesAPIClient = new WorkspacesAPIClient(
      tokenManager,
      apiBaseUrlDRString(this.args['data_residency'].toLowerCase()),
      this.logger,
    )

    try {
      const workspace = await workspacesAPIClient.get(this.args['workspace_id'])

      await this.updateGlobalConfig(workspace)

      this.displayResults([workspace])
    } catch (error) {
      logApiError(this, error)
      this.exit(1)
    }
  }

  displayResults(resources: IWorkspaceResource[]): void {
    CliUx.ux.table(
      resources,
      {
        data_residency: {
          header: 'data_residency',
        },
        workspace_id: {
          header: 'workspace_id',
        },
        name: {
          header: 'name',
        },
        'me.role': {
          header: 'me.role',
          get: (row: IWorkspaceResource) => row._embedded.me.role,
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

  async updateGlobalConfig(workspace: IWorkspaceResource): Promise<void> {
    await this.loadGlobalConfig(this.getConfigPath())

    this.globalConfig!.selectWorkspaceDataResidency = workspace.data_residency
    this.globalConfig!.selectedWorkspace = workspace.workspace_id

    await this.saveConfig(this.getConfigPath(), this.globalConfig!)
  }

  async saveConfig(
    configLocation: string,
    config: IGlobalAuthConfiguration,
  ): Promise<void> {
    await fs.outputJson(configLocation, config, { spaces: 2 })
  }
}
