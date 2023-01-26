import { CliUx, Flags } from '@oclif/core'
import { APIClientCredentialsConfiguration } from '../../api/APIConfiguration'
import {
  IListSimCheckResource,
  ISimCheckResource,
  SimCheckAPIClient,
} from '../../api/SimCheckAPIClient'
import { ClientCredentialsManager } from '../../api/TokenManager'
import { apiBaseUrlDR, tokenUrlDR } from '../../DefaultUrls'
import CommandWithProjectConfig from '../../helpers/CommandWithProjectConfig'
import ILogger from '../../helpers/ILogger'
import { displayPagination } from '../../helpers/ux'
import {
  doesProjectConfigExist,
  isProjectCredentialsValid,
} from '../../helpers/ValidationUtils'
import { logApiError } from '../../utilities'

export default class SimCheckList extends CommandWithProjectConfig {
  static description =
    'Lists details for all SIMChecks or a specific SIMCheck if the a check-id argument is passed'

  static pageNumberFlag = Flags.integer({
    description: `The page number to return in the list resource. Ignored if the "check_id" argument is used.`,
    default: 1,
  })
  static pageSizeFlag = Flags.integer({
    description:
      'The page size to return in list resource request. Ignored if the "check_id" argument is used.',
    default: 10,
  })
  static searchFlag = Flags.string({
    description:
      'A RSQL search query. To ensure correct parsing put your query in quotes. For example "--search \'status==COMPLETED\'". Ignored if the "check_id" argument is used.',
  })
  static sortFlag = Flags.string({
    description:
      'Sort query in the form "{parameter_name},{direction}". For example, "created_at,asc" or "created_at,desc". Ignored if the "check_id" argument is used.',
    default: 'created_at,desc',
  })

  static flags = {
    ...CommandWithProjectConfig.flags,
    ...CliUx.ux.table.flags(),
    'page-number': SimCheckList.pageNumberFlag,
    'page-size': SimCheckList.pageSizeFlag,
    search: SimCheckList.searchFlag,
    sort: SimCheckList.sortFlag,
  }

  static args = [
    {
      name: 'check_id',
      required: false,
      description: 'The check_id for the SIMCheck to list',
    },
  ]

  tokenScope = 'sim_check'

  typeOfCheck = 'SIMCheck'

  async parseCommand(): Promise<any> {
    return this.parse(SimCheckList)
  }

  getApiClient(
    apiConfiguration: APIClientCredentialsConfiguration,
    logger: ILogger,
  ): SimCheckAPIClient {
    const tokenManager = new ClientCredentialsManager(apiConfiguration, logger)

    return new SimCheckAPIClient(
      tokenManager,
      apiBaseUrlDR(
        this.projectConfig?.data_residency || 'eu',
        this.globalConfig!,
      ),
      logger,
    )
  }

  async run(): Promise<void> {
    const result = await this.parseCommand()
    this.args = result.args
    this.flags = result.flags
    await this.loadProjectConfig()

    await super.run()

    doesProjectConfigExist(this.projectConfig)
    isProjectCredentialsValid(this.projectConfig!)

    if (!this.projectConfig?.data_residency) {
      this.warn(
        'No data_residency specified in project config tru.json. It will default to eu',
      )
    }

    const apiConfiguration: APIClientCredentialsConfiguration = {
      clientId: this.projectConfig!.credentials[0].client_id!,
      clientSecret: this.projectConfig!.credentials[0].client_secret,
      scopes: [this.tokenScope],
      tokenUrl: tokenUrlDR(
        this.projectConfig?.data_residency || 'eu',
        this.globalConfig!,
      ),
    }

    const apiCheckClient = this.getApiClient(apiConfiguration, this.logger)

    if (this.args.check_id) {
      let singleResource: ISimCheckResource
      try {
        singleResource = await apiCheckClient.get(this.args.check_id)

        this.displayResults([singleResource])
      } catch (error) {
        logApiError(this, error)
        this.exit(1)
      }
    } else {
      let listResource: IListSimCheckResource
      try {
        listResource = await apiCheckClient.list({
          page: this.flags['page-number'],
          size: this.flags['page-size'],
          search: this.flags.search,
          sort: this.flags.sort,
        })

        this.displayResults(listResource._embedded.checks)
        displayPagination(
          this.logger,
          listResource.page,
          `${this.typeOfCheck}s`,
        )
      } catch (error) {
        logApiError(this, error)
        this.exit(1)
      }
    }
  }

  displayResults(resources: ISimCheckResource[]): void {
    // do not use table sort as it only works for simple types e.g., number, etc.
    // and the API already returns sorted results
    const flagsWithNoSort = { ...this.flags, sort: undefined }

    CliUx.ux.table(
      resources,
      {
        check_id: {
          header: 'check_id',
        },
        created_at: {
          header: 'created_at',
        },
        status: {
          header: 'status',
        },
        charge_currency: {
          header: 'charge_currency',
        },
        charge_amount: {
          header: 'charge_amount',
        },
        no_sim_change: {
          header: 'no_sim_change',
        },
        url: {
          extended: true,
          header: '_links.self.href',
          get: (row) => row._links.self.href,
        },
      },
      {
        printLine: (s: any) => {
          this.logger!.info(s)
        },
        ...flagsWithNoSort, // parsed flags
      },
    )
  }
}
