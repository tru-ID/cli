import { CliUx } from '@oclif/core'
import { APIConfiguration } from '../../api/APIConfiguration'
import { ICreateTokenResponse } from '../../api/HttpClient'
import { OAuth2APIClient } from '../../api/OAuth2APIClient'
import CommandWithProjectConfig from '../../helpers/CommandWithProjectConfig'
import { IProjectConfiguration } from '../../IProjectConfiguration'
import { logApiError } from '../../utilities'

export default class CreateToken extends CommandWithProjectConfig {
  static description = 'Creates an OAuth2 token'

  static flags = {
    ...CommandWithProjectConfig.flags,
    output: CliUx.ux.table.flags().output,
    extended: CliUx.ux.table.flags().extended,
    'no-header': CliUx.ux.table.flags()['no-header'],
    'no-truncate': CliUx.ux.table.flags()['no-truncate'],
  }

  static examples = [
    `# use workspace credentials to create token
$ tru oauth2:token
`,
    `# use project credentials to create token
$ tru oauth2:token --${CommandWithProjectConfig.projectDirFlagName} path/to/project
`,
    `# assign a token to a variable in shell
$ TOKEN=$(tru oauth2:token --${CommandWithProjectConfig.projectDirFlagName} path/to/project --no-header)
$ echo $TOKEN
Emesua0F7gj3qOaav7UaKaBwefaaefaAxlrdGom_mb3U.78Od2d9XpvTQbd44eM1Uf7nzz9e9nezs5TRjPmpDnMc`,
  ]

  async run() {
    const result = await this.parse(CreateToken)

    this.args = result.args
    this.flags = result.flags

    // if --projects_dir has been supplied running in the context of the project
    // otherwise, running in the context of the workspaces
    const runningInProjectContext =
      !!this.flags[CommandWithProjectConfig.projectDirFlagName]

    if (runningInProjectContext) {
      await this.loadProjectConfig()
    }

    const clientId = runningInProjectContext
      ? this.projectConfig?.credentials[0].client_id
      : this.globalConfig?.defaultWorkspaceClientId
    const clientSecret = runningInProjectContext
      ? this.projectConfig?.credentials[0].client_secret
      : this.globalConfig?.defaultWorkspaceClientSecret
    const scopes: string[] = this.getScopes(
      runningInProjectContext,
      this.projectConfig,
    )

    this.logger.debug(
      `Creating a token for a ${
        runningInProjectContext ? 'Project' : 'Workspace'
      } with the scope "${scopes.join(' ')}"`,
    )

    const apiClient = new OAuth2APIClient(
      new APIConfiguration({
        clientId: clientId,
        clientSecret: clientSecret,
        scopes: scopes,
        baseUrl:
          this.globalConfig?.apiBaseUrlOverride ??
          `https://${this.globalConfig?.defaultWorkspaceDataResidency}.api.tru.id`,
      }),
      this.logger,
    )

    try {
      const tokenCreationResult = await apiClient.create()

      this.displayResults([tokenCreationResult])
    } catch (error) {
      logApiError(this, error)
      this.exit(1)
    }
  }

  displayResults(resources: ICreateTokenResponse[]) {
    CliUx.ux.table(
      resources,
      {
        access_token: {
          header: 'access_token',
        },
        scope: {
          header: 'scope',
          extended: true,
        },
        token_type: {
          header: 'token_type',
          extended: true,
        },
        expires_in: {
          header: 'expires_in',
          extended: true,
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

  getScopes(
    runningInProjectContext: boolean,
    projectConfig?: IProjectConfiguration,
  ): string[] {
    let scopes: string[]

    if (runningInProjectContext) {
      // Defaulting to phone_check since that was the initial scope defined and just to keep compatible with old project config
      // that do not have the scopes in tru.json of project directory.
      scopes = projectConfig?.credentials[0].scopes ?? ['phone_check']
    } else {
      // In Workspace. Set Workspaces scopes
      scopes = ['workspaces', 'projects', 'usage', 'balances']
    }

    return scopes
  }
}
