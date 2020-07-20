import * as sinon from 'ts-sinon'
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai'

import {Projects} from '../../src/api/projects'
import {APIConfiguration} from '../../src/api/APIConfiguration';

import axios from "axios"
import { access } from 'fs-extra';
import Axios from 'axios';

const expect = chai.expect;
chai.use(sinonChai);

describe('API: projects', () => {
    it('should make a request to create a Project with an access token', async () => {
        const projectName:string = 'a project'
        const accessToken:string = 'i am an access token'
        const axiosInstance = axios.create
        sinon.default.stub(axios, 'create').returns(axios)
        const axiosPostStub = sinon.default.stub(axios, 'post')
        
        axiosPostStub.withArgs('/token', sinon.default.match.any, sinon.default.match.any).resolves({data: {access_token: accessToken}})
        axiosPostStub.withArgs('/projects', sinon.default.match.any, sinon.default.match.any).resolves({name: projectName})

        const projectsAPI:Projects = new Projects(
            new APIConfiguration({
                clientId: 'client_id',
                clientSecret: 'client_secret', 
                baseUrl: 'https://example.com/api'
            })
        )

        const result = await projectsAPI.create({name: projectName})

        expect(axiosPostStub).to.have.been.calledWith(
                '/projects',
                sinon.default.match.has('name', projectName),
                sinon.default.match((arg) => {
                    return arg.headers['Authorization'] === `Bearer ${accessToken}`
                })
            )

    })
})