---
name: Backend feature template
about: Features relating to the backend
title: "[BACKEND]"
type: Feature
labels: backend
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
<!-- A clear and concise description of what the problem is. Ex. I'm always frustrated when [...] -->

**Describe the solution you'd like**
<!-- A clear and concise description of what you want to happen. -->

**Describe alternatives you've considered**
<!-- A clear and concise description of any alternative solutions or features you've considered. -->

**Additional context**
<!-- Add any other context or screenshots about the feature request here. -->

**BEFORE MERGING**
- [ ] Integration test written for services
- [ ] [Schemas annotated](https://tsoa-community.github.io/docs/annotations.html) if adding new models
- [ ] Code generation run (*hint*: `yarn workspace server tsoa spec-and-routes`)
- [ ] Appropriate mocks created where possible
- [ ] PR Reviewed (For non-trivial changes)
- [ ] Changes tested after rebasing on master or merging in master (*hint*: `git fetch origin master:master`, then `git rebase master` or `git merge master`)
- [ ] All required PR checks passing
