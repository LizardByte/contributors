#!/usr/bin/env bash
set -e

repos=(
  "build-deps"
  "contribkit"
  "Sunshine"
)

crowdin_projects=(
  606145
  614257
)

github_accounts=(
  "ReenigneArcher"
)

output_dir="$(pwd)/dist"

# Debug output for CI environment
echo "GITHUB_JOB: ${GITHUB_JOB:-not set}"

# Check if we're running in a GitHub Actions job named "build"
# If so, skip all token-dependent sections since secrets won't be available
if [[ "${GITHUB_JOB}" = "build" ]]; then
  echo "Running in GitHub Actions 'build' job - skipping all token-dependent sections"
  echo "Done!"
  exit 0
fi

echo "Building sponsors..."
pushd configs/sponsors || exit 1
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors --force
npx contribkit --outputDir="${output_dir}" -w=1800 --name=sponsors.wide
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors.part1 --filter=">=9.9"
npx contribkit --outputDir="${output_dir}" -w=800 --name=sponsors.part2 --filter="<9.9"
popd || exit 1

echo "Building GitHub contributors..."
pushd configs/github || exit 1
for repo in "${repos[@]}"; do
  echo "Building GitHub contributors for ${repo}..."
  export CONTRIBKIT_GITHUB_CONTRIBUTORS_REPO="${repo}"
  npx contribkit --outputDir="${output_dir}" -w=800 --name="github.${repo}" --force
done
popd || exit 1

echo "Building GitHub contributions..."
pushd configs/githubContributions || exit 1
for account in "${github_accounts[@]}"; do
  echo "Building GitHub contributions for account ${account}..."
  export CONTRIBKIT_GITHUB_CONTRIBUTIONS_LOGIN="${account}"
  npx contribkit --outputDir="${output_dir}" --name="githubContributions.${account}"  --force
done
popd || exit 1

echo "Building CrowdIn contributors..."
pushd configs/crowdin || exit 1
for project in "${crowdin_projects[@]}"; do
  echo "Building CrowdIn contributors for project ${project}..."
  export CONTRIBKIT_CROWDIN_PROJECT_ID="${project}"
  npx contribkit --outputDir="${output_dir}" -w=800 --name="crowdin.${project}" --force
done
popd || exit 1

echo "Done!"
