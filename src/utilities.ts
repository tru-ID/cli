import { Command } from '@oclif/core'
import axios from 'axios'

export function stringToSnakeCase(value: string): string {
  return value.trim().replace(new RegExp(/\s+/g), '_').toLowerCase()
}

export function logApiError(command: Command, error: any): void {
  if (axios.isAxiosError(error)) {
    if (error.config.url && error.config.baseURL) {
      command.log(
        `API Error: Call to ${error.config.baseURL}${error.config.url} failed.\n`,
        `${error.toString()} ${
          error.response?.data
            ? JSON.stringify(error.response.data, null, 2)
            : ''
        }`,
      )
    } else {
      command.log(
        `API Error:${error.toString()} ${
          error.response?.data
            ? JSON.stringify(error.response.data, null, 2)
            : ''
        }`,
      )
    }
  } else {
    command.log('API Error (no response):', error)
  }
}
