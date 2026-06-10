# CryptoExchanger

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve dashboard
```

To create a production bundle:

```sh
npx nx build dashboard
```

To see all available targets to run for a project, run:

```sh
npx nx show project dashboard
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Nx project graph

To open the workspace project graph in a browser, run:

```sh
npm exec nx -- graph
```

If the graph page is empty or graph construction is stuck, reset only the Nx
workspace metadata and start the graph again:

```sh
npm exec nx -- reset --onlyWorkspaceData
npm exec nx -- graph
```

To bypass the Nx daemon and isolated plugin workers while diagnosing the
problem, run:

```sh
NX_DAEMON=false NX_ISOLATE_PLUGINS=false npm exec nx -- graph
```

To verify the graph data without opening a browser, print it in the terminal:

```sh
npm exec nx -- graph --print
```

## Playwright end-to-end tests

Install the operating-system dependencies required by Playwright browsers:

```sh
npx playwright install-deps
```

Install the Chromium, Firefox, and WebKit browser binaries:

```sh
npx playwright install
```

The current Playwright project is `@crypto-exchanger/dashboard-e2e`. Its
configuration starts `@crypto-exchanger/dashboard` on
`http://localhost:4200` and runs tests from `apps/dashboard-e2e/src`.

Run all configured end-to-end tests through Nx:

```sh
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e
```

Pass Playwright CLI options after `--`:

```sh
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e -- --project=chromium
```

Useful options:

| Option | Description |
| --- | --- |
| `--project=chromium` | Run tests only in Chromium. Use `firefox` or `webkit` for another configured browser. |
| `--headed` | Show the browser window instead of running headlessly. |
| `--ui` | Open Playwright's interactive test runner. |
| `--debug` | Run with Playwright Inspector, one worker, and no test timeout. |
| `--grep="text"` | Run tests whose titles match the regular expression. |
| `--workers=1` | Run tests sequentially in a single worker. |
| `--retries=2` | Retry failed tests up to two times. |
| `--trace=on` | Record a trace for every test run. |
| `--reporter=html` | Generate an HTML test report. |
| `--last-failed` | Run only tests that failed in the previous execution. |
| `--list` | List matching tests without executing them. |
| `--update-snapshots` | Update screenshot and other test snapshots. |
| `-x` | Stop after the first failure. |

Examples:

```sh
# Run Chromium tests with a visible browser.
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e -- --project=chromium --headed

# Open the interactive test runner.
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e -- --ui

# Debug tests matching their title.
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e -- --debug --grep="example"

# Run one test file.
npm exec nx -- run @crypto-exchanger/dashboard-e2e:e2e -- src/example.spec.ts
```

The `web` and `admin` applications need their own Playwright e2e projects and
`webServer` settings before they can be tested independently with these
commands.

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Crypto Exchange Apps

The workspace contains a public SSR web app and a private admin SPA prepared for backend integration:

```txt
apps/web    Public SSR client app
apps/admin  Private operator SPA
```

Runtime API URL is configured through `VITE_API_BASE_URL`; see `.env.example`, `apps/web/.env.example`, and `apps/admin/.env.example`.

Preferred Nx commands when the local Nx project graph is available:

```sh
npx nx serve web
npx nx serve admin
npx nx build web
npx nx build admin
npx nx lint web
npx nx lint admin
```

Direct verification commands used for the current SPA skeleton:

```sh
npx vite build -c apps/web/vite.config.mts
npx vite build -c apps/admin/vite.config.mts
npx tsc -p apps/web/tsconfig.app.json --noEmit
npx tsc -p apps/admin/tsconfig.app.json --noEmit
```

### Web SSR

The public `web` app uses Vite SSR for SEO-friendly server-rendered HTML on the landing page.

```sh
npx nx run web:dev
npx nx run web:serve
npx nx run web:build
NODE_ENV=production npx nx run web:start
```

The SSR server renders `apps/web/index.html` through `apps/web/src/entry-server.tsx` and hydrates on the client through `apps/web/src/entry-client.tsx`.
