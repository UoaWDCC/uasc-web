# Contributing Guidelines
Thank you for considering contributing to our project (UASC is the largest sports club at the University of Auckland)! This document outlines the process and guidelines for contributing.

## Table of Contents
- [Issue Creation](#issue-creation)
- [Branch Naming](#branch-naming)
- [Pull Requests](#pull-requests)
- [Testing Guidelines](#testing-guidelines)
- [Handling Generated Files](#handling-generated-files)
- [Package Management](#package-management)
## Issue Creation
Anyone can create tickets for bugs or feature requests. Please ensure you:
- Use the appropriate issue templates
- Provide detailed information for developers to understand the context
- Create the issue on our [project board](https://github.com/orgs/UoaWDCC/projects/34)
## Branch Naming
Branch names should follow the format: `<issue-number>-<relevant-name>`
**Note:** Keep the name relevant to the issue (exceptions for funny names)

### Recommended workflow for creating a new branch:

```bash
git checkout master
git pull
git checkout -b <branch-name>
```

## Pull Requests
### General Guidelines

- All changes to master must be made through pull requests

- At least ONE approval is required

- Workflows will run to ensure code quality and test coverage

### Code Review

Everyone is welcome and encouraged to review code. Please remember:

- Maintain respectful communication

- Do not request changes for minor suggestions that do not break functionality ("nits")

### Merging Strategy

- The feature lead (primary contributor) should merge their own PR

- This ensures accountability and clear ownership of the changes

## Testing Guidelines
### Client-Side Testing

- Use Storybook for UI component development

- Create files with *.story.tsx naming scheme

- Example Storybook story structure:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';
const meta: Meta<typeof YourComponent> = {
  component: YourComponent,
};
export default meta;
type Story = StoryObj<typeof YourComponent>;
export const FirstStory: Story = {
  args: {
    // Component props here
  },
};
```

### Server-Side Testing
- Unit tests required for most non-data-fetching logic

- Integration tests required for:

  - Business layer services

  - Data layer services

- Optional: API endpoint testing using supertest

File naming conventions:

- Tests: `*.test.ts*`

- Mocks: `*.mock.ts`

## Handling Generated Files
When resolving merge conflicts with generated files:

1. Update master:

```bash
git fetch origin master:master
```

2. Merge changes:
```bash
git merge master
```

3. Run codegen commands

4. Commit resolved conflicts:

```bash
git commit -a -m "fix merge conflicts"
```

5. Push changes

## Package Management
### Important Notes
- Install packages in appropriate workspaces

- DO NOT use npm for package installation

- Refer to the [onboarding documentation](https://github.com/UoaWDCC/uasc-web/wiki/Onboarding) for detailed instructions

- For any questions or clarifications, please open an issue or contact the project maintainers.
