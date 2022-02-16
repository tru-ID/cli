The [**tru.ID**](https://tru.id) CLI

<!-- [![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/4auth-cli.svg)](https://npmjs.org/package/4auth-cli)
[![Downloads/week](https://img.shields.io/npm/dw/4auth-cli.svg)](https://npmjs.org/package/4auth-cli)
[![License](https://img.shields.io/npm/l/4auth-cli.svg)](https://github.com/4auth/4auth-cli/blob/master/package.json) -->

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
- [Development](#development)
<!-- tocstop -->

# Usage

Every run of the CLI will check to see if all required configuration is in place.

<!-- usage -->

```sh-session
$ npm install -g @tru_id/cli
$ tru COMMAND
running command...
$ tru (--version)
@tru_id/cli/0.9.7 linux-x64 node-v16.11.1
$ tru --help [COMMAND]
USAGE
  $ tru COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`tru coverage:country CODE`](#tru-coveragecountry-code)
- [`tru coverage:reach DEVICE-IP`](#tru-coveragereach-device-ip)
- [`tru help [COMMAND]`](#tru-help-command)
- [`tru oauth2:token`](#tru-oauth2token)
- [`tru phonechecks:create [PHONE_NUMBER]`](#tru-phonecheckscreate-phone_number)
- [`tru phonechecks:list [CHECK_ID]`](#tru-phonecheckslist-check_id)
- [`tru phonechecks:traces CHECK_ID`](#tru-phonecheckstraces-check_id)
- [`tru projects:create [NAME]`](#tru-projectscreate-name)
- [`tru projects:list [PROJECT_ID]`](#tru-projectslist-project_id)
- [`tru projects:update [PROJECT-ID]`](#tru-projectsupdate-project-id)
- [`tru setup:credentials CLIENT-ID CLIENT-SECRET DATA-RESIDENCY`](#tru-setupcredentials-client-id-client-secret-data-residency)
- [`tru simchecks:create [PHONE_NUMBER]`](#tru-simcheckscreate-phone_number)
- [`tru simchecks:list [CHECK_ID]`](#tru-simcheckslist-check_id)
- [`tru simchecks:traces CHECK_ID`](#tru-simcheckstraces-check_id)
- [`tru subscriberchecks:create [PHONE_NUMBER]`](#tru-subscribercheckscreate-phone_number)
- [`tru subscriberchecks:list [CHECK_ID]`](#tru-subscribercheckslist-check_id)
- [`tru subscriberchecks:traces CHECK_ID`](#tru-subscribercheckstraces-check_id)
- [`tru usage:daily`](#tru-usagedaily)
- [`tru usage:hourly`](#tru-usagehourly)
- [`tru usage:monthly`](#tru-usagemonthly)
- [`tru workspaces`](#tru-workspaces)

## `tru coverage:country CODE`

Retrieve country based coverage and prices

```
USAGE
  $ tru coverage:country [CODE] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  CODE  two letter code ISO 3166-1 alpha-2 or country dialing code

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  Retrieve country based coverage and prices
```

_See code: [dist/commands/coverage/country.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/coverage/country.ts)_

## `tru coverage:reach DEVICE-IP`

Find if a certain device ip is reachable

```
USAGE
  $ tru coverage:reach [DEVICE-IP] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  DEVICE-IP  The device ip in ipv4 or ipv6 format

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  Find if a certain device ip is reachable
```

_See code: [dist/commands/coverage/reach.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/coverage/reach.ts)_

## `tru help [COMMAND]`

Display help for tru.

```
USAGE
  $ tru help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tru.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `tru oauth2:token`

Creates an OAuth2 token

```
USAGE
  $ tru oauth2:token [--debug] [-h] [--project-dir <value>] [--output csv|json|yaml | --no-truncate | ] [-x | ]
    [--no-header | ]

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --debug                Enables debug logging for the CLI
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file

DESCRIPTION
  Creates an OAuth2 token

EXAMPLES
  # use workspace credentials to create token

    $ tru oauth2:token

  # use project credentials to create token

    $ tru oauth2:token --project-dir path/to/project

  # assign a token to a variable in shell
  $ TOKEN=$(tru oauth2:token --project-dir path/to/project --no-header)
  $ echo $TOKEN
  Emesua0F7gj3qOaav7UaKaBwefaaefaAxlrdGom_mb3U.78Od2d9XpvTQbd44eM1Uf7nzz9e9nezs5TRjPmpDnMc
```

_See code: [dist/commands/oauth2/token.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/oauth2/token.ts)_

## `tru phonechecks:create [PHONE_NUMBER]`

Creates a PhoneCheck within a project

```
USAGE
  $ tru phonechecks:create [PHONE_NUMBER] [--debug] [-h] [--project-dir <value>]

ARGUMENTS
  PHONE_NUMBER  The phone number to perform the Check on

FLAGS
  -h, --help             Show CLI help.
  --debug                Enables debug logging for the CLI
  --project-dir=<value>  The directory that contains the tru.json Project configuration file

DESCRIPTION
  Creates a PhoneCheck within a project
```

_See code: [dist/commands/phonechecks/create.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/phonechecks/create.ts)_

## `tru phonechecks:list [CHECK_ID]`

Lists details for all PhoneChecks or a specific PhoneCheck if the a check-id argument is passed

```
USAGE
  $ tru phonechecks:list [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--page_number <value>]
    [--page_size <value>] [--search <value>]

ARGUMENTS
  CHECK_ID  The check_id for the PhoneCheck to list

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource. Ignored if the "check_id" argument
                         is used.
  --page_size=<value>    [default: 10] The page size to return in list resource request. Ignored if the "check_id"
                         argument is used.
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --search=<value>       A RSQL search query. To ensure correct parsing put your query in quotes. For example "--search
                         'status==COMPLETED'". Ignored if the "check_id" argument is used.
  --sort=<value>         Sort query in the form "{parameter_name},{direction}". For example, "created_at,asc" or
                         "created_at,desc". Ignored if the "check_id" argument is used.

DESCRIPTION
  Lists details for all PhoneChecks or a specific PhoneCheck if the a check-id argument is passed
```

_See code: [dist/commands/phonechecks/list.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/phonechecks/list.ts)_

## `tru phonechecks:traces CHECK_ID`

Get the traces of a PhoneCheck

```
USAGE
  $ tru phonechecks:traces [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--trace-id <value>]

ARGUMENTS
  CHECK_ID  The check_id for which we want to get the traces

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --sort=<value>         property to sort by (prepend '-' for descending)
  --trace-id=<value>     The trace-id for which we want to get the logs

DESCRIPTION
  Get the traces of a PhoneCheck
```

_See code: [dist/commands/phonechecks/traces.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/phonechecks/traces.ts)_

## `tru projects:create [NAME]`

Creates a new Project

```
USAGE
  $ tru projects:create [NAME] [--debug] [-h] [--project-dir <value>] [--phonecheck-callback <value> | ] [--mode
    live|sandbox]

ARGUMENTS
  NAME  the name of the project to create

FLAGS
  -h, --help                     Show CLI help.
  --debug                        Enables debug logging for the CLI
  --mode=<option>                Set the project mode to "live" or "sandbox"
                                 <options: live|sandbox>
  --phonecheck-callback=<value>  set a callback to be invoked when a PhoneCheck reaches an end state
  --project-dir=<value>          The directory that contains the tru.json Project configuration file

DESCRIPTION
  Creates a new Project

EXAMPLES
  $ tru projects:create
  What is the name of the project?: My first project
  Creating Project "My first project"

  $ tru projects:create --phonecheck-callback https://example.com/callback

  $ tru projects:create --mode sandbox

  $ tru projects:create --mode live
```

_See code: [dist/commands/projects/create.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/projects/create.ts)_

## `tru projects:list [PROJECT_ID]`

Lists details for all Projects or a Projects that match a given criteria

```
USAGE
  $ tru projects:list [PROJECT_ID] [--debug] [-h] [--columns <value> | -x] [--sort <value>] [--filter <value>]
    [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--page_number <value>] [--page_size <value>]
    [--search <value>]

ARGUMENTS
  PROJECT_ID  The project_id for the Project to retrieve

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource. Ignored if the "project_id"
                         argument is used.
  --page_size=<value>    [default: 10] The page size to return in list resource request. Ignored if the "project_id"
                         argument is used.
  --search=<value>       A RSQL search query. To ensure correct parsing put your query in quotes. For example "--search
                         'name=p*'". Ignored if the "check_id" argument is used.
  --sort=<value>         Sort query in the form "{parameter_name},{direction}". For example, "created_at,asc" or
                         "created_at,desc". Ignored if the "check_id" argument is used.

DESCRIPTION
  Lists details for all Projects or a Projects that match a given criteria
```

_See code: [dist/commands/projects/list.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/projects/list.ts)_

## `tru projects:update [PROJECT-ID]`

Update an existing Project

```
USAGE
  $ tru projects:update [PROJECT-ID] [--debug] [-h] [--project-dir <value>] [--phonecheck-callback <value> |
    --remove-phonecheck-callback] [--mode live|sandbox]

ARGUMENTS
  PROJECT-ID  the ID of the project to update

FLAGS
  -h, --help                     Show CLI help.
  --debug                        Enables debug logging for the CLI
  --mode=<option>                Set the project mode to "live" or "sandbox"
                                 <options: live|sandbox>
  --phonecheck-callback=<value>  set a callback to be invoked when a PhoneCheck reaches an end state
  --project-dir=<value>          The directory that contains the tru.json Project configuration file
  --remove-phonecheck-callback   remove the PhoneCheck callback configuration from the Project

DESCRIPTION
  Update an existing Project

EXAMPLES
  $ tru projects:update --phonecheck-callback https://example.com/callback

  $ tru projects:update --remove-phonecheck-callback

  $ tru projects:update --mode sandbox

  $ tru projects:update --mode live
```

_See code: [dist/commands/projects/update.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/projects/update.ts)_

## `tru setup:credentials CLIENT-ID CLIENT-SECRET DATA-RESIDENCY`

Setup the CLI with workspace credentials

```
USAGE
  $ tru setup:credentials [CLIENT-ID] [CLIENT-SECRET] [DATA-RESIDENCY]

ARGUMENTS
  CLIENT-ID       the workspace credentials id
  CLIENT-SECRET   the workspace credentials secret
  DATA-RESIDENCY  the data residency of this workspace e.g. EU

DESCRIPTION
  Setup the CLI with workspace credentials
```

_See code: [dist/commands/setup/credentials.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/setup/credentials.ts)_

## `tru simchecks:create [PHONE_NUMBER]`

Create SIMChecks within a Project

```
USAGE
  $ tru simchecks:create [PHONE_NUMBER] [--debug] [-h] [--project-dir <value>]

ARGUMENTS
  PHONE_NUMBER  The phone number to perform the SIMCheck on

FLAGS
  -h, --help             Show CLI help.
  --debug                Enables debug logging for the CLI
  --project-dir=<value>  The directory that contains the tru.json Project configuration file

DESCRIPTION
  Create SIMChecks within a Project
```

_See code: [dist/commands/simchecks/create.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/simchecks/create.ts)_

## `tru simchecks:list [CHECK_ID]`

Lists details for all SIMChecks or a specific SIMCheck if the a check-id argument is passed

```
USAGE
  $ tru simchecks:list [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--page_number <value>]
    [--page_size <value>] [--search <value>]

ARGUMENTS
  CHECK_ID  The check_id for the SIMCheck to list

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource. Ignored if the "check_id" argument
                         is used.
  --page_size=<value>    [default: 10] The page size to return in list resource request. Ignored if the "check_id"
                         argument is used.
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --search=<value>       A RSQL search query. To ensure correct parsing put your query in quotes. For example "--search
                         'status==COMPLETED'". Ignored if the "check_id" argument is used.
  --sort=<value>         Sort query in the form "{parameter_name},{direction}". For example, "created_at,asc" or
                         "created_at,desc". Ignored if the "check_id" argument is used.

DESCRIPTION
  Lists details for all SIMChecks or a specific SIMCheck if the a check-id argument is passed
```

_See code: [dist/commands/simchecks/list.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/simchecks/list.ts)_

## `tru simchecks:traces CHECK_ID`

Get the traces of a SIMCheck

```
USAGE
  $ tru simchecks:traces [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--trace-id <value>]

ARGUMENTS
  CHECK_ID  The check_id for which we want to get the traces

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --sort=<value>         property to sort by (prepend '-' for descending)
  --trace-id=<value>     The trace-id for which we want to get the logs

DESCRIPTION
  Get the traces of a SIMCheck
```

_See code: [dist/commands/simchecks/traces.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/simchecks/traces.ts)_

## `tru subscriberchecks:create [PHONE_NUMBER]`

Creates SubscriberChecks within a project

```
USAGE
  $ tru subscriberchecks:create [PHONE_NUMBER] [--debug] [-h] [--project-dir <value>]

ARGUMENTS
  PHONE_NUMBER  The phone number to perform the Check on

FLAGS
  -h, --help             Show CLI help.
  --debug                Enables debug logging for the CLI
  --project-dir=<value>  The directory that contains the tru.json Project configuration file

DESCRIPTION
  Creates SubscriberChecks within a project
```

_See code: [dist/commands/subscriberchecks/create.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/subscriberchecks/create.ts)_

## `tru subscriberchecks:list [CHECK_ID]`

Lists details for all SubscriberChecks or a specific SubscriberCheck if the a check-id argument is passed

```
USAGE
  $ tru subscriberchecks:list [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--page_number <value>]
    [--page_size <value>] [--search <value>]

ARGUMENTS
  CHECK_ID  The check_id for the SubscriberCheck to list

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource. Ignored if the "check_id" argument
                         is used.
  --page_size=<value>    [default: 10] The page size to return in list resource request. Ignored if the "check_id"
                         argument is used.
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --search=<value>       A RSQL search query. To ensure correct parsing put your query in quotes. For example "--search
                         'status==COMPLETED'". Ignored if the "check_id" argument is used.
  --sort=<value>         Sort query in the form "{parameter_name},{direction}". For example, "created_at,asc" or
                         "created_at,desc". Ignored if the "check_id" argument is used.

DESCRIPTION
  Lists details for all SubscriberChecks or a specific SubscriberCheck if the a check-id argument is passed
```

_See code: [dist/commands/subscriberchecks/list.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/subscriberchecks/list.ts)_

## `tru subscriberchecks:traces CHECK_ID`

Get the traces of a SubscriberCheck

```
USAGE
  $ tru subscriberchecks:traces [CHECK_ID] [--debug] [-h] [--project-dir <value>] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--trace-id <value>]

ARGUMENTS
  CHECK_ID  The check_id for which we want to get the traces

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --project-dir=<value>  The directory that contains the tru.json Project configuration file
  --sort=<value>         property to sort by (prepend '-' for descending)
  --trace-id=<value>     The trace-id for which we want to get the logs

DESCRIPTION
  Get the traces of a SubscriberCheck
```

_See code: [dist/commands/subscriberchecks/traces.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/subscriberchecks/traces.ts)_

## `tru usage:daily`

Get Daily Usage. The date range defaults to current date.

```
USAGE
  $ tru usage:daily [--debug] [-h] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--search <value>] [--group-by <value>] [--page_number
    <value>] [--page_size <value>]

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --group-by=<value>     Group results by one or more fields e.g product_id or project_id or product_id,project_id
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource.
  --page_size=<value>    [default: 10] The page size to return in list resource request.
  --search=<value>       The RSQL query for usage. date is required e.g --search='date>=2021-03-29'
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Daily Usage. The date range defaults to current date.
```

_See code: [dist/commands/usage/daily.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/usage/daily.ts)_

## `tru usage:hourly`

Get Hourly Usage. The date range defaults to current date.

```
USAGE
  $ tru usage:hourly [--debug] [-h] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--search <value>] [--group-by <value>] [--page_number
    <value>] [--page_size <value>]

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --group-by=<value>     Group results by one or more fields e.g product_id or project_id or product_id,project_id
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource.
  --page_size=<value>    [default: 10] The page size to return in list resource request.
  --search=<value>       The RSQL query for usage. date is required e.g --search='date>=2021-03-29'
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Hourly Usage. The date range defaults to current date.
```

_See code: [dist/commands/usage/hourly.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/usage/hourly.ts)_

## `tru usage:monthly`

Get Monthly Usage. The date range defaults to the current calendar month.

```
USAGE
  $ tru usage:monthly [--debug] [-h] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ] [--search <value>] [--group-by <value>] [--page_number
    <value>] [--page_size <value>]

FLAGS
  -h, --help             Show CLI help.
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --debug                Enables debug logging for the CLI
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --group-by=<value>     Group results by one or more fields e.g product_id or project_id or product_id,project_id
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --page_number=<value>  [default: 1] The page number to return in the list resource.
  --page_size=<value>    [default: 10] The page size to return in list resource request.
  --search=<value>       The RSQL query for usage. date is required e.g --search='date>=2021-03-29'
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Monthly Usage. The date range defaults to the current calendar month.
```

_See code: [dist/commands/usage/monthly.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/usage/monthly.ts)_

## `tru workspaces`

Displays default workspace information

```
USAGE
  $ tru workspaces [--debug] [-h] [--output csv|json|yaml | --no-truncate | ] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  --debug            Enables debug logging for the CLI
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>

DESCRIPTION
  Displays default workspace information
```

_See code: [dist/commands/workspaces/index.ts](https://github.com/tru-ID/tru-cli/blob/v0.9.7/dist/commands/workspaces/index.ts)_

<!-- commandsstop -->

# Development

## Commits

The release process will generate/update a CHANGELOG based on commit messages. In order to do this commits should follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

If you forget to follow this the release process allows for manual editing of the CHANGELOG.

## Releases

Releases should be performed on the `dev` branch and the related commits then merged into the `main` branch.

### CHANGELOG & Package Version

The CLI uses [standard-version](https://github.com/conventional-changelog/standard-version) to generate a changelog and bump the package version.

To update the README with new CLI instructions and add new version info to the CHANGELOG run:

```bash
$ npm run release
```

Additional parameters supported by `standard-version` can be passed as follows:

```bash
$ npm run release {additional_parameters}
```

For example:

```bash
$ npm run release --dry-run
```

### Commit and Tag

If all goes well, we're ready to mark the release as complete.

Once the CHANGELOG and version in package.json are correct ensure the file updates are staged and run the following replacing `current_version` with the version of the CLI being released:

```bash
$ git commit -m 'chore(release): v{current_version}'
  git tag v{currentVersion}
  git push origin v{currentVersion}
  git push origin canary
```

### Build & Release

Merge `canary` into `main` to release and the installers are automatically test and publish to NPM `@latest`. All commits on `canary` will also publish to NPM with a `@canary` tag.

##### Release MacOS Installer

To release the installers create a `.env` file with the following, including valid AWS credentials and an [NPM token](https://docs.npmjs.com/about-access-tokens):

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
NPM_TOKEN=
```

To upload to S3 run:

```
npm run publish:mac
```

##### Publish to NPM

To publish to NPM tagged with `canary` run:

```
$ npm run npm:publish:dev
```

For a full production release run:

```
$ npm run npm:publish:prod
```

## Configuration

Every run of the CLI will check to see if all required configuration is in place. This is achieved through a [hook](https://oclif.io/docs/hooks).

For more inforation see the [Oclif Configuration How to](https://oclif.io/docs/config).
