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

## Nx Cloud

Nx Cloud provides remote task caching, CI run history, and optional task
distribution. The connection is identified by the `nxCloudId` property in
`nx.json`.

### Connect the repository

1. Sign in to [Nx Cloud](https://cloud.nx.app/) and install the Nx Cloud GitHub
   App for the repository.
2. From the repository root, run:

   ```sh
   npm exec nx -- connect
   ```

3. Open the URL printed by the command and finish linking the workspace to the
   correct Nx Cloud organization.
4. Commit the generated `nxCloudId` in `nx.json` and merge it into the default
   branch:

   ```sh
   git add nx.json
   git commit -m "chore: connect Nx Cloud"
   git push
   ```

If the GitHub onboarding page cannot create its pull request, generate the
configuration locally:

```sh
npm exec nx -- connect --generateToken
```

If Nx reports `Existing Nx Cloud configuration found`, inspect the existing
`nxCloudId` before continuing. Replacing it creates or selects a different Nx
Cloud workspace and disconnects the repository from the previous one.

### Verify remote caching

Run a cacheable target:

```sh
npm exec nx -- run ui-kit:test -- --run
```

Clear only the local Nx cache and run the same target again:

```sh
npm exec nx -- reset
npm exec nx -- run ui-kit:test -- --run
```

The second run should contain `[remote cache]` and a link to the run in Nx
Cloud. CI tasks executed through Nx use the same remote cache. Nx Agents and
distributed task execution are optional and should only be enabled after the
normal CI workflow is stable.

### Important: transferring or copying the repository

> Before transferring this repository to another owner or organization,
> creating an independent fork, or using it as a template, you must replace or
> remove `nxCloudId` from `nx.json`.

Keeping the existing value connects the copied or transferred repository to
the original Nx Cloud workspace. This can reuse its cache and publish task or
CI metadata under the wrong organization.

Choose one of these approaches before the repository is used in its new
location:

- Remove `nxCloudId`, commit the change, and run `npm exec nx -- connect` after
  the transfer to create a new connection.
- Create/select the destination Nx Cloud workspace and replace `nxCloudId` with
  its ID before running CI in the new repository.

Never run CI for an independent copy while it still contains the source
repository's `nxCloudId`.

[Learn more about Nx Cloud](https://nx.dev/ci/intro/why-nx-cloud) and
[remote caching](https://nx.dev/ci/features/remote-cache).

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

Runtime API URL is configured through `VITE_API_BASE_URL`; see `apps/web/.env.example` and `apps/admin/.env.example`.

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
