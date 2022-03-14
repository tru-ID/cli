import { test } from '@oclif/test'
import chai from 'chai'
import fs from 'fs-extra'
import path from 'path'
import sinonChai from 'sinon-chai'
import sinon from 'ts-sinon'
import CommandWithProjectConfig from '../../../src/helpers/CommandWithProjectConfig'
import { IGlobalAuthConfiguration } from '../../../src/IGlobalAuthConfiguration'
import { IProjectConfiguration } from '../../../src/IProjectConfiguration'

const expect = chai.expect
chai.use(sinonChai)

const workspaceConfiguration: IGlobalAuthConfiguration = {
  selectedWorkspace: 'workspace_id',
  selectWorkspaceDataResidency: 'eu',
  tokenInfo: {
    refresh_token: 'refresh_token',
    scope: 'console openid',
  },
}

// Stubs
let existsSyncStub: any
let readJsonStub: any

const projectDirectory = 'my_first_project'
const expectedProjectFullPath = path.join(process.cwd(), projectDirectory)
const projectConfigPath = path.join(expectedProjectFullPath, 'tru.json')

const projectConfig: IProjectConfiguration = {
  project_id: 'c69bc0e6-a429-11ea-bb37-0242ac130003',
  name: 'My First Project',
  created_at: '2020-06-01T16:43:30+00:00',
  credentials: [
    {
      client_id: '6779ef20e75817b79602',
      client_secret: 'dzi1v4osLNr5vv0.2mnvcKM37.',
      scopes: ['sim_check', 'phone_check', 'subscriber_check'],
    },
  ],
}

describe('Command: oauth2:token', () => {
  beforeEach(() => {
    existsSyncStub = sinon.stub(fs, 'existsSync')
    existsSyncStub
      .withArgs(sinon.match(new RegExp(/config.json/)))
      .returns(true)
    existsSyncStub.withArgs(sinon.match(new RegExp(/tru.json/))).returns(true)

    readJsonStub = sinon.stub(fs, 'readJson')
    readJsonStub
      .withArgs(sinon.match(new RegExp(/config.json/)))
      .resolves(workspaceConfiguration)
    readJsonStub.withArgs(projectConfigPath).resolves(projectConfig)

    sinon
      .stub(fs, 'outputJson')
      .withArgs(
        sinon.match(new RegExp(/config.json/)),
        sinon.match.any,
        sinon.match.any,
      )
      .resolves()
  })

  afterEach(() => {
    sinon.restore()
  })

  test
    // For workspace token
    .nock('https://login.tru.id', (api) => {
      api
        .persist()
        .post(
          new RegExp('/oauth2/token'),
          'grant_type=refresh_token&refresh_token=refresh_token&client_id=cli_hq',
        )
        .reply(200, {
          refresh_token: 'refresh_token',
          access_token: 'access_token_workspace',
          expires_in: 3599,
          scope: 'console offline_access openid',
          token_type: 'bearer',
        })
    })
    .stdout()
    .command(['oauth2:token'])
    .it(
      `should use workspace credentials when the --${CommandWithProjectConfig.projectDirFlagName} flag is not set`,
      (ctx) => {
        expect(ctx.stdout).to.contain('access_token_workspace')
      },
    )

  test
    // For project credentials
    .nock('https://eu.api.tru.id', (api) => {
      api
        .persist()
        .post(
          new RegExp('/oauth2/v1/token'),
          'grant_type=client_credentials&scope=sim_check%20phone_check%20subscriber_check',
        )
        .basicAuth({
          user: '6779ef20e75817b79602',
          pass: 'dzi1v4osLNr5vv0.2mnvcKM37.',
        })
        .reply(200, {
          access_token: 'access_token_project',
          expires_in: 3599,
          scopes: 'sim_check phone_check subscriber_check',
          token_type: 'bearer',
        })
    })
    .stdout()
    .command([
      'oauth2:token',
      `--${CommandWithProjectConfig.projectDirFlagName}`,
      expectedProjectFullPath,
    ])
    .it(
      `should use project credentials when the --${CommandWithProjectConfig.projectDirFlagName} flag is set`,
      (ctx) => {
        expect(ctx.stdout).to.contain('access_token_project')
      },
    )
})
